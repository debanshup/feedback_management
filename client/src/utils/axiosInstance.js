import axios from 'axios';

const axiosInstance = axios.create({
  // Dynamically set the base URL based on the environment
  baseURL: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3001/api'  // For local development
    : '/api',  // For production (Vercel routing)
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // If you're using cookies for authentication
});

export default axiosInstance;
