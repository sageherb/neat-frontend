import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";

import Main from "./src/screens/Main";
import MemoStack from "./src/navigation/MemoStack";

const Container = styled.View`
  flex: 1;
`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Container>
      <StatusBar style="auto" />
      {isLoggedIn ? <MemoStack /> : <Main onLogin={handleLogin} />}
    </Container>
  );
}

export default App;
