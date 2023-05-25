<template>
    <div>

        <!-- Task Create show popup -->
        <div class="task-create-popup-container" v-if="showTaskCreation">
            <div class="task-create-popup-content">
                <h2>Create New Task</h2>
                <span class="close-popup" @click="closeTaskCreation">x</span>
                <form class="task-create-popup" @submit.prevent="createTaskWrapper">
                    <input type="text" placeholder="Title" v-model="title" />
                    <textarea placeholder="Description" v-model="description"></textarea>
                    <button class="button" type="submit">Create Task</button>
                </form>
            </div>
        </div>


        <!-- Existing tasks -->
        <div class="card-overview">

            <div class="card" 
            v-for="(card, index) in tasksForColumn"
            :key="card._id" 
            :draggable="true"
            @dragstart="dragStart(card._id, column._id, $event)" 
            @dragend="dragEnd($event)">

                <div class="card-information">
                    <div class="card-header">{{ card.title }}</div>
                    <div class="card-description">{{ card.description }}</div>
                </div>
                <div>
                    <button id="edit" class="button project-btn-margin edit-button" @click="selectTask(card)" >
                        <span class="edit-icon"></span>
                    </button>
                </div>

            </div>


        </div>


        <!-- Task Update Component show popup -->
        <taskUpdateComponent v-if="showTaskUpdate" 
        :task="selectedTask" 
        :projectId="props.projectId" 
        :columnId="props.columnId" 
        @close="showTaskUpdate = false"  
        @update-finished="taskUpdated"
        @task-deleted="taskDeleted"
        />

    </div>
</template>

<script setup>
import { ref, watch, computed, defineProps } from 'vue'

import { dragStart, dragEnd } from '../../modules/columns';

import taskUpdateComponent from './taskUpdateComponent.vue';

import {
    tasks,
    fetchTasksForColumns,
} from '../../modules/Crud_operator/task/taskGetCrud';

import {
    createTask,
    showTaskCreation,
    closeTaskCreation,
    selectedColumnId,
} from '../../modules/Crud_operator/task/taskCreateCrud';


const props = defineProps({
    columnId: String,
    projectId: String,
    column: Object,
    columnIndex: Number,
});

// variable for creating the new task
const title = ref('');
const description = ref('');

// createTaskWrapper function for creating the the new task and close the popup
const createTaskWrapper = async () => {
  const newTask = await createTask(
    selectedColumnId.value,
    props.projectId,
    title.value,
    description.value
  );

  // Check if newTask is successfully created
  if (newTask) {
  console.log("newTask:", newTask);

  // Update local state only when backend operation is successful
  await fetchTasksForColumns(props.projectId, [selectedColumnId.value]);

  } else {
    console.log("Task creation failed");
  }
  
  closeTaskCreation();
};


watch( () => props.columnId,

  async (newColumnId) => {

    if (newColumnId && props.projectId) {

      await fetchTasksForColumns(props.projectId, [newColumnId]);
    } else {
      console.log('taskComponent.vue: props.columnId or props.projectId is undefined');
    }
  },
  { immediate: true }
);


let tasksForColumn = computed(() => {
  const columnTasks = tasks.value[props.columnId] || [];
  return columnTasks.tasks || [];
});


const showTaskUpdate = ref(false);
const selectedTask = ref(null);


const selectTask = (task) => {
    selectedTask.value = { ...task, projectId: props.projectId, columnId: props.columnId };
    showTaskUpdate.value = true;
};

const taskUpdated = async (updatedTask) => {
  await fetchTasksForColumns(updatedTask.projectId, [updatedTask.columnId]);
};


const taskDeleted = async ({ projectId, columnId }) => {
  await fetchTasksForColumns(projectId, [columnId]);
};

</script>




<style lang="scss" scoped>
@import "@/assets/global.scss";

.task-create-popup-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.task-create-popup-content {
    background-color: var(--primary-color);
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 30%;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
    border-radius: 8px;
}

form{
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

form textarea{
    max-height: 130px;
    min-height: 130px;
    max-width: 100%;
    min-width: 100%;
    font-family: "Open Sans", sans-serif;
    font-size: 12px;
}

.task-create-popup-content h2 {
    margin-top: 0;
    margin-bottom: 40px;
    color: var(--white-black-color);
}

.task-create-popup input[type="text"],
.task-create-popup textarea {
    width: 100%;
    margin: 10px;
}

.card-information{
    width: 100%;
}

.button {
    background-color: var(--quaternary-color);
    border: none;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    font-weight: 600;
    padding: 12px 30px;
    transition: background-color 0.2s ease-in-out;
    margin-top: 1rem;
}

.button:hover {
    background-color: var(--primary-hover-color);
    color: #000;
}

.close {
    color: var(--white-black-color);
    position: absolute;
    top: 8px;
    right: 8px;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
}

.close:hover {
    color: var(--primary-hover-color);
}

.button {
  padding: 5px 8px !important;
}

.edit-icon{
  display: inline-block;
  width: 15px; 
  height: 15px; 
  background-image: url('@/assets/pencil.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-left: 0 !important;
  
}

#edit{
  margin-top: 0px !important;
  background-color: transparent !important;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}

#edit:hover{
  background-color: #091e4214 !important;
}

.card:hover #edit{
    opacity: 1;
}

.card-overview {
    overflow-x: hidden;
    overflow-y: auto;
    max-height: 60vh;
}

.card {
    background-color: var(--card-backgroundColor);
    color: var(--white-black-color);
    border-radius: 3px;
    box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
    cursor: grab;
    margin-bottom: 8px;
    max-width: 307px;
    min-height: 20px;
    padding: 8px;
    width: 91%;
    height: auto;
    display: flex;
    justify-content: space-between;
}

.card:hover {
    opacity: 0.8;
}

.card-header {
    font-weight: 600;
    font-size: 12px;
    margin-bottom: 8px;
}

.card-description {
    color: var(--tertiary-color);
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 8px;
}
</style>
