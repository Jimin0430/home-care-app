import api from "./api";

// 모든 요양사 정보 받아오기
export const getCaregivers = async () => {
  try {
    const response = await api.get("/caregivers/");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch caregivers:", error);
    throw error;
  }
};

// 요양사 회원가입시 정보 저장하기
export const submitCaregiverInfo = async (caregiverInfo) => {
  try {
    const response = await api.post("/caregivers/", caregiverInfo);
    return response.data;
  } catch (error) {
    console.error("Failed to submit caregiverInfo data:", error);
    throw error;
  }
};

// export const submitPatientInfo = async (patientInfo) => {
//   try {
//     const response = await fetch(`${BASE_URL}/guardians/`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(patientInfo),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to submit patientInfo data");
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// 모든 요양사 정보 받아오기
export const submitPatientInfo = async () => {
  try {
    const response = await api.post("/guardians/");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch caregivers:", error);
    throw error;
  }
};

// 유저 이름 중복체크하기
export const checkUsernameAvailability = async (username) => {
  try {
    const response = await api.get("/account/check-username", {
      params: { username },
    });

    // API 응답이 문자열 "true" 또는 "false"를 반환.
    return response.data === "true";
  } catch (error) {
    if (error.response) {
      console.error("Server responded with an error:", error.response.data);
      throw new Error(
        error.response.data.detail || "Failed to check username availability"
      );
    } else if (error.request) {
      console.error("No response received:", error.request);
      throw new Error("Network error: No response received from server");
    } else {
      console.error("Error setting up the request:", error.message);
      throw new Error("Failed to set up the request");
    }
  }
};
