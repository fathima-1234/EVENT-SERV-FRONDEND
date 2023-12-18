import axios from "axios";

// For local development, replace 'localhost:8000' with your actual backend server address and port.
const localBaseUrl = process.env.REACT_APP_API_BASE_URL

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