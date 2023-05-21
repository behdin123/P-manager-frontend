import { ref } from 'vue';
import api from '../../../api/teamApi.js';

// Create a ref to store the new team data
let newTeam = ref({
    name: '',
    description: '',
    users: []
});

// Function to create a new team, and call the API to save the team
const createTeam = async () => {
    try {
        await api.createTeam(newTeam.value);
        return true; // Return success status
    } catch (error) {
        console.error('Error creating team:', error);
        return false; // Return failure status
    }
};

// Export the functions and variables for use in teamCreateComponent.vue
export {
    createTeam,
    newTeam
};