import axios from "axios";

const BASE_URL = "http://localhost:8000"; // FastAPI 서버의 기본 URL

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
