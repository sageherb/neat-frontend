import { Button } from "react-native";
import styled from "styled-components/native";

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

function Main() {
  return (
    <>
      <LogoContainer>
        <LogoText>NEAT</LogoText>
      </LogoContainer>
      <SignInButtonContainer>
        <Button title="Sign In with Google" />
      </SignInButtonContainer>
    </>
  );
}

export default Main;
