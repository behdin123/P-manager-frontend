import axios from 'axios';

export default {


// Create projects
createProject: async (data) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('tags', data.tags);
      formData.append('private', data.private);
      if (data.image) {
          formData.append('image', data.image, data.image.name);
      }

      const response = await axios.post(`https://p-manager-backend.onrender.com/project/create`, formData, { withCredentials: true,
      });
      
      return response;
      
    } catch (error) {
      console.error('Failed to create project:', error);
      throw error.response.data;
    }
  },



// Get All projects for the user
getAllProjects: async () => {
  try {
    const response = await axios.get('https://p-manager-backend.onrender.com/project/list', { withCredentials: true });
    console.log('Response from API:', response.data.projects);
    return response.data.projects;
    
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    throw error.response.data;
  }
},


// Get a single project by ID
getProjectById: async (projectId) => {
  try {
    const response = await axios.get(`https://p-manager-backend.onrender.com/project/${projectId}`, { withCredentials: true });
    return response.data.project;
  } catch (error) {
    console.error('Failed to fetch project:', error);
    throw error.response.data;
  }
},


// Get columns by project ID
getColumnsByProject: async (projectId) => {
  try {
    const response = await axios.get(`https://p-manager-backend.onrender.com/project/${projectId}/columns`, { withCredentials: true });
    console.log('API response:', response.data); // se if the response.data contains the correct values
    return response.data;

  } catch (error) {
    console.error('Failed to fetch columns:', error);
    throw error.response.data;
  }
},


// Remove a project by ID
removeProject: async (id) => {
  try {
    const response = await axios.delete(`https://p-manager-backend.onrender.com/project/remove/${id}`, { withCredentials: true });
    return response.data;
    
  } catch (error) {
    console.error('Failed to remove project:', error);
    throw error.response.data;
  }
},


// Update project information
updateProject: async (projectId, updatedProject) => {
  try {
    const response = await axios.put(`https://p-manager-backend.onrender.com/project/edit/${projectId}`, updatedProject, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update project:', error);
    throw error.response.data;
  }
},

// Update project image
updateProjectImage: async (projectId, updatedImage) => {
  try {
    const formData = new FormData();
    formData.append('image', updatedImage, updatedImage.name);

    const response = await axios.patch(`https://p-manager-backend.onrender.com/project/edit-projectImage/${projectId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update project image:', error);
    throw error.response.data;
  }
},


}