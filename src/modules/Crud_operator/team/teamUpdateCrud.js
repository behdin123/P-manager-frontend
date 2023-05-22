import api from '../../../api/teamApi.js';

// Function to update a team
const updateTeam = async (teamId, newData) => {
  try {
    const response = await api.updateTeam(teamId, newData);
    return response.success;
  } catch (error) {
    console.error('Error updating team:', error);
    return false;
  }
};

export {
  updateTeam
};