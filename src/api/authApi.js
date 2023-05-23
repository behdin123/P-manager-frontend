import axios from 'axios';

export default {


// Register a new user
register: async (data) => {
    try {
      const response = await axios.post(`https://pwa-rest-api-mevn.onrender.com/auth/register`, data);  
     
      return response;

    } catch (error) {
      throw error;
    }
  },

  // Login a user
  login: async (data) => {
    try {
      const response = await axios.post(`https://pwa-rest-api-mevn.onrender.com/auth/login`, data);  //${BASE_URL}
      
      return response;

    } catch (error) {
      throw error;
    }
  },


}