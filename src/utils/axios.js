import axios from "axios";

// For local development, replace 'localhost:8000' with your actual backend server address and port.
const localBaseUrl = "http://127.0.0.1:8000";

export const details = {
  base_url: localBaseUrl,
};

export const BASE_URL = localBaseUrl;

const instance = axios.create({
  baseURL: localBaseUrl,
  
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;