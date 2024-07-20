import api from "./api";

// 메시지 보내기
export const sendMessage = async (messageInfo) => {
  try {
    const response = await api.post("/message/send-message/", messageInfo);
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

// username으로 내가 보낸 메시지 전체 가져오기
export const getMessageBySender = async (username) => {
  try {
    const response = await api.get(
      `/message/get_message_by_sender?username=${username}`
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

// username으로 내가 받은 메시지 전체 가져오기
export const getMessageByReceiver = async (username) => {
  try {
    const response = await api.get(
      `/message/get_message_by_receiver?username=${username}`
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
