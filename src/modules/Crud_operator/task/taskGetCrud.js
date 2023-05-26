import taskApi from "../../../api/taskApi";
import { ref } from "vue";

const tasks = ref({});

async function fetchTasksForColumns(projectId, columnIds) {
  
    for (const columnId of columnIds) {

      try {
        const columnTasks = await taskApi.getTasksByColumn(projectId, columnId);

        tasks.value[columnId] = columnTasks;
        
      } catch (error) {
        console.error(`Error fetching tasks for column ${columnId}:`, error);
      }
    }
}
  

export{
  tasks,
  fetchTasksForColumns,
}
