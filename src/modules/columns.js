import { ref } from 'vue';
import taskApi from '../api/taskApi';
import api from '../api/projectApi';

import { fetchTasksForColumns } from './Crud_operator/task/taskGetCrud';

const draggingCard = ref(null);
const draggingColumn = ref(null);
const hoveredColumn = ref(null);

const dragStart = (cardId, columnId, event) => {
    event.target.classList.add("dragging");
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", JSON.stringify({ cardId, columnId }));
    draggingCard.value = cardId;
    draggingColumn.value = columnId;
};

const dragEnd = (event) => {
    event.target.classList.remove("dragging");
    const columns = document.querySelectorAll(".column");
    columns.forEach(column => column.classList.remove("dragover"));
    draggingCard.value = null;
    draggingColumn.value = null;
    hoveredColumn.value = null;
};

const dragEnter = (columnIndex, event) => {
    event.preventDefault();
    event.currentTarget.closest(".column").classList.add("dragover");
    draggingCard.value = null;
    draggingColumn.value = null;
    hoveredColumn.value = columnIndex;
};

const dragLeave = (event) => {
    event.preventDefault();
    if (event.relatedTarget !== null && event.currentTarget.contains(event.relatedTarget)) {
        return;
    }
    event.currentTarget.classList.remove("dragover");
    hoveredColumn.value = null;
};

const columns = ref([]);

async function fetchColumns(projectId) {
    
    console.log('fetchColumns: Before fetching columns');

    try {
      columns.value = await api.getColumnsByProject(projectId);
      console.log('fetchColumns: After fetching columns:', columns.value);

    } catch (error) {
      console.error("Error fetching columns:", error);
    }
  }

  

  const drop = async (projectId, columnId, event) => {
    if (event) {
        event.preventDefault();
        const data = JSON.parse(event.dataTransfer.getData("text/plain"));
        const { cardId, columnId: fromColumnId } = data;

        /* console.log("cardId:", cardId);
        console.log("projectId:", projectId);
        console.log("columnId:", columnId);
        console.log("fromColumnId:", fromColumnId); */
        

       
        // Update the task's column on your backend
        await taskApi.updateTaskColumn(cardId, projectId, columnId);

        // Fetch the updated tasks for both columns
        await fetchTasksForColumns(projectId, [fromColumnId, columnId]);
    }
    hoveredColumn.value = null;
};




export { 
    draggingCard, 
    draggingColumn, 
    hoveredColumn,
    columns,
    dragStart, 
    dragEnd, 
    dragEnter, 
    dragLeave,
    fetchColumns, 
    drop,
};
