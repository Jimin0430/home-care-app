import api from "./api";

// username으로 해당 요양사 정보 받아오기
export const getCaregiverData = async (username) => {
  try {
    const response = await api.get(
      `/caregivers/username/{caregiver_username}?username=${username}`
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "on getCaregiverData_ Server responded with an error:",
        error.response.data
      );
      throw new Error(
        error.response.data.detail || "Failed to get Caregiver Data"
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

// username으로 요양사 마이프로필 정보 불러오기
export const getCaregiverMyProfile = async (username) => {
  try {
    const response = await api.post(`/profile/caregivers?username=${username}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "on getCaregiverMyProfile _ Server responded with an error:",
        error.response.data
      );
      throw new Error(
        error.response.data.detail || "Failed to get Caregiver MyProfile Data"
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

// 모든 요양사 정보 받아오기
export const getCaregivers = async () => {
  try {
    const response = await api.get("/caregivers/");
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Server responded with an error:", error.response.data);
      throw new Error(
        error.response.data.detail || "Failed to get All Caregivers List"
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
