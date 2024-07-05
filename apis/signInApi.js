import { Platform } from "react-native";

if (__DEV__) {
  console.log("This code is running in the development environment");
} else {
  console.log("This code is running in the production environment");
}

const getBaseUrl = () => {
  if (__DEV__) {
    //개발 환경, 배포 환경 구분
    // 로컬 개발 환경에서는 로컬 IP 주소 사용
    return Platform.OS === "android"
      ? "http://172.30.1.58:8080/" //안드로이드 애뮬레이터 ip주소(10.0.2.2) 설정
      : "https://192.168.1.10:8000/"; //ios는 로컬 ip 주소 사용하는게 안전? 로컬 FastApi서버 기본 url
  } else {
    // 실제 배포 환경에서는 공용 URL 사용
    // return "https://url.com";
    return null;
  }
};

// const BASE_URL = getBaseUrl();
const BASE_URL = "http://172.30.1.58/";

export const submitCaregiverInfo = async (caregiverInfo) => {
  try {
    const response = await fetch(`${BASE_URL}/caregivers/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(caregiverInfo),
    });

    if (!response.ok) {
      throw new Error("Failed to submit caregiverInfo data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
