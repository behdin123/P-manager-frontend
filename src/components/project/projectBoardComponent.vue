<template>
      <div class="main-container" v-bind:class="{ 'main-container-dark': darkMode }" :style="{ backgroundImage: projectBackgroundImage(project) }">

        <div class="board">
        
          <div class="column" v-for="column in columns" 
              @dragover.prevent 
              @dragenter.prevent="dragEnter(column._id, $event)" 
              @dragleave.prevent="dragLeave($event)"
              @drop.prevent="dropEvent($event, projectId, column._id)"
              :key="index">
  
            <div class="column-list">

              <div class="column-header"> {{ column.title }}</div>

              <task-component :column-id="column._id" :project-id="projectId" :column="column" />

              <div @click="openTaskCreation(column._id)" class="add-card">
                <span class="plus">+</span>
                <span>Add a card...</span>
              </div>

            </div>

          </div>

        </div>

      </div>
</template>
  

<script setup>

import { ref, onMounted, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import api from '../../api/projectApi';

import taskComponent from '../task/taskComponent.vue';

import { 
  columns,
  drop, 
  dragEnter,
  dragLeave,
  fetchColumns, 
} from '../../modules/columns';

import {
  projectBackgroundImage,
} from '../../modules/Main_logic/Home';

import {
  openTaskCreation,
} from '../../modules/Crud_operator/task/taskCreateCrud';



const project = ref({});

async function fetchProject(projectId) {
  try {
    project.value = await api.getProjectById(projectId);
  } catch (error) {
    console.error("Error fetching project:", error);
  }
}

const { id: projectId } = useRoute().params;

onMounted(async () => {
  await fetchProject(projectId);
  await fetchColumns(projectId);
  /* console.log('columns:', columns.value); */
});

watchEffect(() => {
  /* console.log('Columns changed:', columns.value); */
});


const dropEvent = (event, projectId, columnId) => {
  /* console.log("Drop event in Vue component: ", event); */
  drop(projectId, columnId, event);
};

</script>


<style lang="scss" scoped>
@import "@/assets/global.scss";

.plus {
    display: inline-block;
    font-size: 22px;
    font-weight: 400;
    margin-right: 10px;
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
}

.board {
    display: flex;
    justify-content: space-between;
    padding: 60px 5%;
    height: 71.3vh !important;
    margin-top: 95px;
    z-index: 1;
    position: relative;
}

.main-container{
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.main-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3); 
  z-index: 1;
  border-radius: 5px;
}

.main-container-dark::before {
  display: none;
}

.column {
    width: 30%;
    box-shadow: 0 1px 0 rgba(9, 30, 66, .25);
    background-color: var(--column-backgroundColor);
    border-radius: 5px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    margin-right: 12px;
    min-height: 40px;
    width: 25%;
    padding: 8px;
    height: 75vh !important;
}

.column-list {
    border-radius: 3px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    max-height: 100%;
    position: relative;
    white-space: normal;
    width: 100% !important;
}

.card-overview {
    overflow-x: hidden;
    overflow-y: auto;
    max-height: 45vh;
}

.column:last-child {
    margin-right: 0;
}

.column-header {
    font-weight: bold;
    padding: 8px;
    margin-bottom: 8px;
    color: var(--white-black-color);
}

.card {
    background-color: var(--card-color);
    color: var(--tertiary-color);
    border-radius: 3px;
    box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
    cursor: grab;
    margin-bottom: 8px;
    max-width: 300px;
    min-height: 20px;
    padding: 8px;
    width: 90%;
    height: auto;
}

.card:hover {
    opacity: 0.8;
}

.card-header {
    font-weight: bold;
    font-weight: 600;
    margin-bottom: 8px;
}

.card-description {
    color: var(--tertiary-color);
    margin-bottom: 8px;
}

.column-header {
    font-size: 14px;
    font-weight: bolder;

}

.card-header, .card-description, .add-card {
    font-size: 14px;
}

.add-card {
    display: flex;
    align-items: center;
    border-radius: 3px;
    color: #000000;
    cursor: pointer;
    margin-bottom: 8px;
    max-width: 320px;
    padding: 8px;
    padding-left: 0 !important;
    margin-top: 10px !important;
    transition: background-color 0.3s ease-in-out;
}

.add-card:hover {
    background-color: var(--primary-hover-color);
    color: #000;
}

</style>