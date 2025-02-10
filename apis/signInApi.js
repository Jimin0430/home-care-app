import api from "./api";

// 요양사 회원가입시 정보 저장하기
export const submitCaregiverInfo = async (caregiverInfo) => {
  try {
    const response = await api.post("/caregivers/", caregiverInfo);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Server responded with an error:", error.response.data);
      throw new Error(
        error.response.data.detail || "Failed to submit caregiverInfo data"
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

// 신규 보호자 정보 등록하기
export const submitPatientInfo = async (patientInfo) => {
  try {
    const response = await api.post("/guardians/", patientInfo);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Server responded with an error:", error.response.data);
      throw new Error(
        error.response.data.detail || "Failed to submit caregiverInfo data"
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

// 유저 이름 중복체크하기
export const checkUsernameAvailability = async (username) => {
  try {
    const response = await api.get("/account/check-username", {
      params: { username },
    });
    // API 응답이 true 또는 false 를 반환.
    return response.data.is_unique === true;
  } catch (error) {
    if (error.response) {
      console.error("Server responded with an error:", error.response.data);
      throw new Error(
        error.response.data.detail.msg ||
          "Failed to check username availability"
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

// 이메일 중복체크하기
export const checkEmailAvailability = async (email) => {
  try {
    const response = await api.get("/account/check-email", {
      params: { email },
    });
    // API 응답이 true 또는 false 를 반환.
    return response.data.is_unique === true;
  } catch (error) {
    if (error.response) {
      console.error("Server responded with an error:", error.response.data);
      throw new Error(
        error.response.data.detail.msg || "Failed to check email availability"
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
