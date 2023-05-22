import { ref } from 'vue';
import api from '../../../api/teamApi.js';

// Create a ref to store the teams
let teams = ref([]);

// Function to get the teams and store them in the teams ref
const getTeams = async () => {
    try {
        const response = await api.getTeams();
        teams.value = response.teams;
    } catch (error) {
        console.error('Error getting teams:', error);
    }
};

// Export the functions and variables for use in teamGetComponent.vue
export {
    getTeams,
    teams,
};