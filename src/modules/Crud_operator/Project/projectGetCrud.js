import { ref } from 'vue';
import api from '../../../api/projectApi.js';

/* 
*
* Get Project 
*
*/
const projects = ref([]);

const fetchProjects = async () => {
  try {
    const fetchedProjects = await api.getAllProjects();

    // Sort projects by creation date in descending order (newest first)
    fetchedProjects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    projects.value = fetchedProjects;

  } catch (error) {
    console.error('Error fetching projects:', error);
  }
};

export {
  projects,
  fetchProjects,
};