import AsyncStorage from "@react-native-async-storage/async-storage";

export const setUserRole = async (value) => {
  try {
    const userType = JSON.stringify(false);
    await AsyncStorage.setItem("user-role", userType);
  } catch (e) {
    console.log(e);
  }
};

export const getUserRole = async () => {
  try {
    const userType = await AsyncStorage.getItem("user-role");
    return userType != null ? JSON.parse(userType) : false;
  } catch (e) {
    console.log(e);
    return null;
  }
};
