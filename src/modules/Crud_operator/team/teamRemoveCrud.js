import api from '../../../api/teamApi.js';

// Function to delete a team by ID
const removeTeamById = async (teamId) => {
  try {
    const response = await api.removeTeam(teamId);
    return response.success;
  } catch (error) {
    console.error('Error removing team:', error);
    return false;
  }
};

export {
  removeTeamById
};