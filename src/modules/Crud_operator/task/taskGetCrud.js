import taskApi from "../../../api/taskApi";
import { ref } from "vue";

const tasks = ref({});

async function fetchTasksForColumns(projectId, columnIds) {

  
    for (const columnId of columnIds) {
      

      /* console.log(`taskGetCrud.js: fetchTasksForColumns - columnId: ${columnId}, projectId: ${projectId}`); */
      try {
        console.log(`taskGetCrud.js: fetchTasksForColumns - columnId: ${columnId}, projectId: ${projectId}`);

        const columnTasks = await taskApi.getTasksByColumn(projectId, columnId);
        console.log(`Received tasks from API for column ${columnId}:`, columnTasks);

        tasks.value[columnId] = columnTasks;
        console.log(`Updated tasks.value for column ${columnId}:`, tasks.value[columnId]);

        console.log(`Fetched tasks for column ${columnId}:`, tasks.value[columnId]);
        
      } catch (error) {
        console.error(`Error fetching tasks for column ${columnId}:`, error);
      }
    }

    console.log('Finished fetchTasksForColumns', tasks.value);
}
  

export{
  tasks,
  fetchTasksForColumns,
}
