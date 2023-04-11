// src/api/api.js

import axios from 'axios';

const apiClient = axios.create({
  BASE_URL: 'http://localhost:3000/', // Replace with your API's base URL
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default {

  // fetch a list of projects
  getProjects() {
    return apiClient.get('/projects'); // Replace with API's endpoint to fetch projects
  },

  // Register a new user
  register: async (data) => {
    try {
        
      console.log("Request body:", data);
      const response = await axios.post(`http://localhost:3000/auth/register`, data);  //${BASE_URL}
     
      return response;
      
    } catch (error) {
      throw error;
    }
  },

  // Login a user
  login: async (data) => {
    try {
        
      console.log("Request body:", data);
      const response = await axios.post(`http://localhost:3000/auth/login`, data);  //${BASE_URL}
     
      return response;
    } catch (error) {
      throw error;
    }
  },


};
