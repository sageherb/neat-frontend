import { useEffect } from "react";
import styled from "styled-components/native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { IOS_CLIENT_ID, WEB_CLIENT_ID, SERVER_URI } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: IOS_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
  });

  const signIn = async (accessToken) => {
    try {
      const result = await fetch(`${SERVER_URI}/api/users/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessToken,
        }),
      });

      const data = await result.json();
      const { token } = data;

      await AsyncStorage.setItem("token", token);

      onLogin();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (response?.type === "success" && response?.authentication?.accessToken) {
      signIn(response.authentication.accessToken);
    }
  }, [response]);

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
