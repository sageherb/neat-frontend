import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getDecodeToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const { userId } = decodedToken;

    return userId;
  } catch (error) {
    return null;
  }
};

export default getDecodeToken;
