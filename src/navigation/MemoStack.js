import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MemoList from "../screens/MemoList";

const Stack = createNativeStackNavigator();

function MemoStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MemoList"
          component={MemoList}
          options={{
            title: "메모",
            headerBackTitleVisible: true,
            headerShadowVisible: false,
            headerSearchBarOptions: {
              placeholder: "검색",
              cancelButtonText: "취소",
              headerTransparent: false,
              hideWhenScrolling: false,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MemoStack;