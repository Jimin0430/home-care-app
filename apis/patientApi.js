import api from "./api";

// username으로 해당 요양사 정보 받아오기
export const getPatientData = async (username) => {
  try {
    const response = await api.get(
      `/guardians/username/{guardian_username}?username=${username}`
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "on getPatientData Server responded with an error:",
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
