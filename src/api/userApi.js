import axios from 'axios';

export default {


// Get the user data
getProfile: async () => {
    try {

      const res = await axios.get(`https://p-manager-frontend.onrender.com/user/profile`, { withCredentials: true });

      console.log("Request body:", res.data);
      
      return res.data;
    } catch (error) {
      throw error.red.data;
    }
  },

  // Update user information
  updateUserInfo: async (data) => {
    try {

      console.log("Request body:", data);

      const response = await axios.post(`https://p-manager-frontend.onrender.com/user/profile`, data, { withCredentials: true });
      
      console.log("API Response:", response.data, data  );

      if (response.data.success) {
          axios.post(`https://p-manager-frontend.onrender.com/user/profile`, data, { withCredentials: true }); // return response;
      }
    
    } catch (error) {
      console.error('Failed to update user information:', error);
      throw error.response.data;
    }
  },


  // Upload user profile image
  uploadProfileImage: async (formData) => {
    try {
      const response = await axios.post("https://p-manager-frontend.onrender.com/user/profile-image", formData, {withCredentials: true,});

      if (response.data.success) {
        return response.data;
      }

      alert("Failed to upload profile image.");
    } catch (error) {
      console.error("Error uploading profile image:", error);
      throw error.response.data;
    }
  },






}