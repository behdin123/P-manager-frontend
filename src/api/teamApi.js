import axios from 'axios';

export default {

    // Create team
    createTeam: async (data) => {
        try {
        const response = await axios.post(`https://p-manager-frontend.onrender.com/team/create`, data, { withCredentials: true, });
        return response;
        } catch (error) {
        console.error('Failed to create team:', error);
        throw error.response.data;
        }
    },

   // Get teams
   getTeams: async () => {
        try {
        const response = await axios.get(`https://p-manager-frontend.onrender.com/team/me`, { withCredentials: true, });
        return response.data;
        } catch (error) {
        console.error('Failed to get teams:', error);
        throw error.response.data;
        }
    },

    // Update team
    updateTeam: async (teamId, data) => {
        try {
        const response = await axios.put(`https://p-manager-frontend.onrender.com/team/update/${teamId}`, data, { withCredentials: true });
        return response.data;
        } catch (error) {
        console.error('Failed to update team:', error);
        throw error.response.data;
        }
    },

    removeTeam: async (teamId) => {
        try {
          const response = await axios.delete(`https://p-manager-frontend.onrender.com/team/remove/${teamId}`, { withCredentials: true });
          return response.data;
        } catch (error) {
          console.error('Failed to remove team:', error);
          throw error.response.data;
        }
    }

}