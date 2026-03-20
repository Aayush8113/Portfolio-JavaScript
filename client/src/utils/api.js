import axios from 'axios';

// 1. Create Axios Instance
const api = axios.create({ // Fixed typo: removed space
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, 
});

// 2. Request Interceptor
api.interceptors.request.use(
  (config) => {
    if (import.meta.env.DEV) {
      console.log(`[API Request] ${config.method.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. Response Interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    const errorMessage =
      error.response?.data?.message || 
      error.message || 
      "Something went wrong.";

    console.error('❌ API Error:', errorMessage);
    return Promise.reject({ ...error, message: errorMessage });
  }
);

// 4. AI Service Function
export const chatWithAI = async (prompt) => { // Fixed typo: removed space
  try {
    const response = await api.post('/chat', { prompt });
    return response.data.reply;
  } catch (error) {
    console.error("AI Chat Error:", error);
    return "Sorry, I'm having trouble connecting to my AI brain right now.";
  }
};

export default api;