import axios from 'axios';

const taskApi = {
  
  createTask: async (taskData) => {
    try {
      const response = await axios.post(`https://project-m.dk/project/${taskData.projectId}/tasks/create`, taskData, { withCredentials: true });
      return response.data.task;
    } catch (error) {
      console.error('Failed to create task:', error);
      throw error.response.data;
    }
  },

  getTasksByColumn: async (projectId, columnId) => {
    try {
      const response = await axios.get(`https://project-m.dk/project/${projectId}/column/${columnId}/tasks`, { withCredentials: true });
  
      console.log("Response:", response);
  
      return response.data;
    } catch (error) {
      console.error("Error getting tasks:", error);
      throw error.response.data;
    }
  },

  updateTask: async (taskId, projectId, taskData) => {
    try {
      const response = await axios.put(`https://project-m.dk/project/${projectId}/tasks/${taskId}/update`, taskData, { withCredentials: true });
      return response.data.task;
    } catch (error) {
      console.error('Failed to update task:', error);
      throw error.response.data;
    }
  },

  deleteTask: async (taskId, projectId) => {
    try {
      await axios.delete(`https://project-m.dk/project/${projectId}/tasks/${taskId}/delete`, { withCredentials: true });
    } catch (error) {
      console.error('Failed to delete task:', error);
      throw error;
    }
  },

  updateTaskColumn: async (taskId, projectId, columnId) => {
    try {
      const response = await axios.put(`https://project-m.dk/project/${projectId}/tasks/${taskId}/update-column`, { columnId }, { withCredentials: true });
      console.log('updateTaskColumn response:', response);  
      return response.data.task;
    } catch (error) {
      console.error('Failed to update task column:', error);
      throw error.response.data;
    }
  },

};

export default taskApi;
