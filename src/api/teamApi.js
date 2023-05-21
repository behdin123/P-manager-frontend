import axios from 'axios';

export default {
  // Create team
  createTeam: async (data) => {
    try {
      const response = await axios.post(`http://localhost:3000/team/create`, data, { withCredentials: true, });
      return response;
    } catch (error) {
      console.error('Failed to create team:', error);
      throw error;
    }
  },

   // Get teams
   getTeams: async () => {
    try {
      const response = await axios.get(`http://localhost:3000/team/me`, { withCredentials: true, });
      return response.data;
    } catch (error) {
      console.error('Failed to get teams:', error);
      throw error;
    }
  },





}