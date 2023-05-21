import api from '../../../api/projectApi.js';
import { projects } from './projectGetCrud';

const removeProject = async (id) => {
    try {
      await api.removeProject(id);
      projects.value = projects.value.filter(project => project._id !== id);
    } catch (error) {
      console.error('Error removing project:', error);
    }
  };


export {
removeProject
};