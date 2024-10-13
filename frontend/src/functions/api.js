import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/'; // Replace with your FastAPI backend URL

export const signup = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/users/signup`, userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const login = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/users/login`, userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
