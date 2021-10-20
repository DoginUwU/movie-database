import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.params = {
      ...config.params,
      api_key: process.env.NEXT_PUBLIC_API_KEY,
      language: "en-US",
    };
    return config;
  },
  (error) => error
);

export default axiosInstance;
