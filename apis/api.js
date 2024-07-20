import axios from "axios";
import { Platform } from "react-native";

export const BASE_URL = "http://3.38.48.154:8000";
// const BASE_URL = Platform.OS === "ios" ? ios_BASE_URL : android_BASE_URL;
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
