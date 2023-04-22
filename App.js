import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  useEffect(() => {
    const getToken = async () => {
      try {
        const value = await AsyncStorage.getItem("token");

        if (value !== null) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getToken();
  }, []);

  return (
    <Container>
      <StatusBar style="auto" />
      {isLoggedIn ? <MemoStack /> : <Main onLogin={handleLogin} />}
    </Container>
  );
}

export default App;
