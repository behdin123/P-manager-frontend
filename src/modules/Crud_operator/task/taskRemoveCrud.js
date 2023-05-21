import taskApi from '../../../api/taskApi';

const deleteAndClose = async (props, emit) => {
  try {
    const taskId = props.task._id;
    const projectId = props.projectId;
    const columnId = props.task.columnId;  // Sørg for at columnId er defineret i din task

    await taskApi.deleteTask(taskId, projectId);
    console.log(`taskUpdateComponent.vue: deleteAndClose - task._id: ${taskId}, task.projectId: ${projectId}`);

    // Emit 'task-deleted' event with projectId and columnId
    emit('task-deleted', { projectId, columnId });

    emit('close');
  } catch (error) {
    console.error('Failed to delete task:', error);
  }
};


export{
   deleteAndClose
}
