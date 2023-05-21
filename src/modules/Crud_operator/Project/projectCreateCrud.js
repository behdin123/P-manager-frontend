import { ref } from 'vue';
import api from '../../../api/projectApi.js';


/* 
*
* Create Project 
*
*/

// Create a ref to store the selected image file
let imageFile = ref(null);

// Function to handle the file input change event and update the imageFile ref
const onFileChange = (e) => {
    imageFile.value = e.target.files[0];
};

// Create a ref to store the new project data
let newProject = ref({
    title: '',
    description: '',
    private: true,
    tags: []
});

// Create a ref to store the input value for tags
let tagsInput = ref('');

// Function to create a new project, update tags and image, and call the API to save the project
const createProject = async () => {
    newProject.value.tags = tagsInput.value.split(',').map(tag => tag.trim());
    newProject.value.image = imageFile.value;
    try {
        await api.createProject(newProject.value);
        return true; // Return success status
    } catch (error) {
        console.error('Error creating project:', error);
        return false; // Return failure status
    }
};


// Export the functions and variabels for use in projectCreateComponent.vue
export {
    createProject,
    tagsInput,
    newProject,
    onFileChange,
};