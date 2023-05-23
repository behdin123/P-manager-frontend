import axios from 'axios';

export default {


// Register a new user
register: async (data) => {
    try {
      const response = await axios.post(`https://p-manager-backend.onrender.com/auth/register`, data);  
     
      return response;

    } catch (error) {
      throw error.response.data;
    }
  },

  // Login a user
  login: async (data) => {
    try {
      const response = await axios.post(`https://p-manager-backend.onrender.com/auth/login`, data);  //${BASE_URL}
      console.log("Received cookie:", document.cookie);
      return response;

    } catch (error) {
      throw error.response.data;
    }
  },


}