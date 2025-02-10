import AsyncStorage from "@react-native-async-storage/async-storage";

// 최초 회원가입 후 자동 로그인 유지 확인
export const setAutoSignedIn = async (value) => {
  try {
    await AsyncStorage.setItem("auto-signed-in", JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

export const getAutoSignedIn = async () => {
  try {
    const value = await AsyncStorage.getItem("auto-signed-in");
    return value !== null ? JSON.parse(value) : false;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 유저 역할 저장: 요양사, 환자, 요양사 지망생
export const setUserRole = async (value) => {
  try {
    const userType = JSON.stringify(value);
    await AsyncStorage.setItem("user-role", userType);
  } catch (e) {
    console.log(e);
  }
};

export const getUserRole = async () => {
  try {
    const userType = await AsyncStorage.getItem("user-role");
    return userType !== null ? JSON.parse(userType) : false;
  } catch (e) {
    console.log(e);
    return null;
  }
};

//유저 역할 인덱스 저장: 각 유저 역할 별 페이지 라우팅에 사용됨
export const setUserRoleIndex = async (value) => {
  try {
    const userRoleIndex = JSON.stringify(value);
    await AsyncStorage.setItem("user-role-index", userRoleIndex);
  } catch (e) {
    console.log(e);
  }
};

export const getUserRoleIndex = async () => {
  try {
    const userRoleIndex = await AsyncStorage.getItem("user-role-index");
    return userRoleIndex !== null ? JSON.parse(userRoleIndex) : -1;
  } catch (e) {
    console.log(e);
    return null;
  }
};

// 유저네임(닉네임) 저장
export const setUserName = async (value) => {
  try {
    const userType = JSON.stringify(value);
    await AsyncStorage.setItem("user-name", userType);
  } catch (e) {
    console.log(e);
  }
};

export const getUserName = async () => {
  try {
    const userType = await AsyncStorage.getItem("user-name");
    return userType !== null ? JSON.parse(userType) : false;
  } catch (e) {
    console.log(e);
    return null;
  }
};
