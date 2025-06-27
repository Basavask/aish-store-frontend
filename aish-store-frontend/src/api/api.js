import axios from 'axios';

// Create a centralized Axios instance
const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Your Spring Boot backend URL
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor to include the JWT token in every request
api.interceptors.request.use(config => {
    // Retrieve user data (which includes the token) from local storage
    const user = JSON.parse(localStorage.getItem('user'));
    
    // If a user and token exist, add the Authorization header
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    
    return config;
}, error => {
    // Handle request errors
    return Promise.reject(error);
});

export default api;
