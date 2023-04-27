import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Main from "./src/screens/Main";
import MemoStack from "./src/navigation/MemoStack";
import store from "./src/redux/configureStore";

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
        const token = await AsyncStorage.getItem("token");

        if (token) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getToken();
  }, []);

  return (
    <Provider store={store}>
      <Container>
        <StatusBar style="auto" />
        {isLoggedIn ? <MemoStack /> : <Main onLogin={handleLogin} />}
      </Container>
    </Provider>
  );
}

export default App;
