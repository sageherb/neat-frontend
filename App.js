import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";

import Main from "./src/screens/Main";

const Container = styled.View`
  flex: 1;
`;

function App() {
  return (
    <Container>
      <StatusBar style="auto" />
      <Main />
    </Container>
  );
}

export default App;
