import axios from 'axios';

export default {

    // Create team
    createTeam: async (data) => {
            try {
            const response = await axios.post(`https://pwa-rest-api-mevn.onrender.com/team/create`, data, { withCredentials: true, });
            return response;
            } catch (error) {
            console.error('Failed to create team:', error);
            throw error;
            }
    },

   // Get teams
   getTeams: async () => {
        try {
        const response = await axios.get(`https://pwa-rest-api-mevn.onrender.com/team/me`, { withCredentials: true, });
        return response.data;
        } catch (error) {
        console.error('Failed to get teams:', error);
        throw error;
        }
    },

    // Update team
    updateTeam: async (teamId, data) => {
        try {
        const response = await axios.put(`https://pwa-rest-api-mevn.onrender.com/team/update/${teamId}`, data, { withCredentials: true });
        return response.data;
        } catch (error) {
        console.error('Failed to update team:', error);
        throw error;
        }
    },

    removeTeam: async (teamId) => {
        try {
          const response = await axios.delete(`https://pwa-rest-api-mevn.onrender.com/team/remove/${teamId}`, { withCredentials: true });
          return response.data;
        } catch (error) {
          console.error('Failed to remove team:', error);
          throw error;
        }
    }

}