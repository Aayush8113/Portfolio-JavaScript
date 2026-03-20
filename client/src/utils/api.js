import axios from 'axios';

const api = axios.create({ 
  baseURL: import.meta.env.PROD ? '/api' : 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, 
});

api.interceptors.request.use(
  (config) => {
    if (import.meta.env.DEV) {
      console.log(`[API Request] ${config.method.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

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

export const chatWithAI = async (prompt) => { 
  try {
    const response = await api.post('/chat', { prompt });
    return response.data.reply;
  } catch (error) {
    console.error("AI Chat Error:", error);
    return "Sorry, I'm having trouble connecting to my AI brain right now.";
  }
};

export default api;