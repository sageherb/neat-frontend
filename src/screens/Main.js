import { useState, useEffect } from "react";
import styled from "styled-components/native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { IOS_CLIENT_ID, WEB_CLIENT_ID } from "@env";

const LogoContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const LogoText = styled.Text`
  font-size: 80px;
`;

const SignInButtonContainer = styled.View`
  justify-content: center;
  align-items: center;
  padding-bottom: 55px;
`;

WebBrowser.maybeCompleteAuthSession();

function Main({ onLogin }) {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: IOS_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
  });

  const getUserInfo = async () => {
    try {
      const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = await res.json();

      if (user.error) {
        throw new Error(user.error.message);
      }

      setUserInfo(user);
      onLogin(true);
      console.log({ user });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (response?.type === "success") {
      setToken(response.authentication.accessToken);
      getUserInfo();
    }
  }, [response, token]);

  return (
    <>
      <LogoContainer>
        <LogoText>NEAT</LogoText>
      </LogoContainer>
      <SignInButtonContainer>
        <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={() => {
            promptAsync();
          }}
        />
      </SignInButtonContainer>
    </>
  );
}

export default Main;
