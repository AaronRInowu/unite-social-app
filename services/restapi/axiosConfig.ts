import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000, // 10 segundos de timeout
  headers: {
    "Content-Type": "application/json",
    // "Authorization":"Bearer" //no se como se va a sacar el token
  },
});

// Interceptor para logs de request
axiosInstance.interceptors.request.use(
  (config) => {
    const url = `${config.baseURL || ''}${config.url || ''}`;
    console.log('🚀 Request:', config.method?.toUpperCase(), url);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('✅ Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', error.message);
    if (error.code === 'ECONNABORTED') {
      console.error('⏱️ Request timeout');
      throw new Error('Request timed out. Please try again.');
    }
    return Promise.reject(error);
  }
);
