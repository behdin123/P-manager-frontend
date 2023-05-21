import taskApi from '../../../api/taskApi';
import { ref } from 'vue'

async function createTask(columnId, projectId, title, description) {
  const taskData = {
    title: title,
    description: description,
    columnId: columnId,
    projectId: projectId,
  };

  let newTask; // Declare newTask variable here

  try {
    newTask = await taskApi.createTask(taskData); // Assign the result to newTask
    console.log('Task created:', newTask);
  } catch (error) {
    console.error('Error creating task:', error);
  }

  return newTask; // Return newTask outside the try-catch block
}


const showTaskCreation = ref(false);
const selectedColumnId = ref(null);

const openTaskCreation = (columnId) => {
    showTaskCreation.value = true;
    selectedColumnId.value = columnId;
};

const closeTaskCreation = () => {
  showTaskCreation.value = false;
};
  

export { 
    createTask,
    showTaskCreation,
    openTaskCreation,
    closeTaskCreation,
    selectedColumnId,
};