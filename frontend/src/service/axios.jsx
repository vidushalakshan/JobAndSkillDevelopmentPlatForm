import axios from 'axios';

const instance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor: Attach Auth Token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Standardize Data Extraction
instance.interceptors.response.use(
  (response) => {
    // If the response follows our ApiResponse structure, extract the 'data' field
    if (response.data && response.data.hasOwnProperty('success') && response.data.hasOwnProperty('data')) {
      return { ...response, data: response.data.data };
    }
    return response;
  },
  (error) => {
    // Standardize error handling if needed
    return Promise.reject(error);
  }
);

export default instance;