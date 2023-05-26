import { ref } from 'vue';
import taskApi from '../../../api/taskApi';


const updatedTask = ref({});

const updateAndClose = async (props, emit) => {
  const updated = await taskApi.updateTask(updatedTask.value._id, updatedTask.value.projectId, updatedTask.value);
  
  // Create a new object with the updated values and the original projectId and columnId
  const updatedTaskWithProjectAndColumnId = {
    ...updated,
    projectId: props.projectId,
    columnId: props.columnId
  };
  
  emit('update-finished', updatedTaskWithProjectAndColumnId);
  emit('close');
};


export{
    updatedTask,
    updateAndClose
}