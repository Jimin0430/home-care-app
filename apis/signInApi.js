const BASE_URL = "http://3.38.48.154:8000";

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

export const submitPatientInfo = async (patientInfo) => {
  try {
    const response = await fetch(`${BASE_URL}/guardians/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patientInfo),
    });

    if (!response.ok) {
      throw new Error("Failed to submit patientInfo data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
