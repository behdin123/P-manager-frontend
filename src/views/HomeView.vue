<template>
  <main>

    <div class="title-container">

      <div class="page-header">

        <!-- Welcome titel -->
        <div class="title">
              <h1>Welcome back to P-manager <b class="user-short-name">{{ capitalizedUsername() }}</b></h1>
        </div>

        <!-- Add new project button -->
        <div class="card">
          <button @click=" openProjectCreation();">
            New Project
            <span class="plus-icon"></span>
          </button>
        </div>

      </div>
     
      <div class="line"></div>

    </div>

    <!-- Project creation popup -->
    <div class="flex">
      <div v-if="showProjectCreation">
        <project-create-component @close="closeProjectCreation" :showProjectCreation="showProjectCreation" />
      </div>
    </div>

    <h2>Your Projects overview</h2>

    <!-- Projects printet out -->
    <div class="project-container">

      <div class="project" v-for="project in projects" :key="project._id"
      :style="{ backgroundImage: projectBackgroundImage(project) }">

        <div class="project-content">
          <div>
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
          </div>

          <div class="project-btn-div">
            <button class="button project-btn-margin edit-button" @click="openProjectUpdatePopup(project)" >
              Edit
              <span class="edit-icon"></span>
            </button>
            <button class="button project-btn-margin" @click.stop="openProject(project)">Open Project</button>
          </div>

        </div>

      </div>
    </div>

    <!-- Project Update popup -->
    <project-update-component 
      v-if="showProjectUpdate" 
      :project="selectedProject"
      @update-finished="onUpdateFinished">
    </project-update-component>



  </main>
</template>


<script setup>
import { useRouter } from 'vue-router';

import { defineProps, watch, onMounted } from 'vue';

import { capitalizedUsername } from '../modules/Main_logic/UserProfile';

import projectCreateComponent from '../components/project/projectCreateComponent.vue';

import { projects, fetchProjects } from '../modules/Crud_operator/Project/projectGetCrud';

import ProjectUpdateComponent from '../Components/project/projectUpdateComponent.vue';

import {
    // Create project popup functions & variables
    showProjectCreation,
    openProjectCreation,
    closeProjectCreation,
    projectBackgroundImage,

    // Update project popup functions & variables
    showProjectUpdate,
    selectedProject,
    openProjectUpdatePopup,
    onUpdateFinished,

} from '../modules/Main_logic/Home';


/*
* composition function useRouterCustom(), which creates an instance of the router and 
* then exports an openProject function that uses this instance to navigate to the 
* ProjectBoard page.
*/
const useRouterCustom = () => {
  
  const router = useRouter();

  // To open a project interface and edit the tasks inside the project overview
  const openProject = (project) => {
    router.push({ name: 'ProjectBoard', params: { id: project._id } });
  };
  return {
    openProject
  }
}

const { openProject } = useRouterCustom();




/*
* Logic that is defined in watch and onMounted
*/

// watch: when showprojectCreation is getting closed, then it calls the fetchprojects function to get the updated list of projects
watch(showProjectCreation, async (newValue, oldValue) => {
    if (!newValue && oldValue) {
      await fetchProjects();
    }
  });


// onMounted: When the component is mounted, fetchProjects function is called to fetch a list of projects to show in HomeView.vue
  onMounted(async () => {
    await fetchProjects();
  });

// props for the darkmode
const props = defineProps({
  dark: {},
});

</script>



<style lang="scss" scoped>

@import "@/assets/global.scss";

body {
  margin: 0;
  padding: 0;
}

main {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  min-height: 100vh;
  margin-top: 95px !important;
  background-color: var(--secondary-color);
}

main h1, h2 {
  font-size: 30px;
  font-weight: bold;
  color: var(--tertiary-color);
  text-align: center;
}

main h2 {
  font-size: 25px !important;
  font-weight: lighter;
  margin-top: 5px;
}

.title-container{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.page-header{
  display: flex;
  align-items: center;
  margin-top: 15px;
  width: 87%;
  justify-content: space-between;
}

.title{
  display: flex;
  justify-content: center;
  animation: fadeInLeft 1.5s ease-out;
}

@keyframes fadeInLeft {
  0% {
    opacity: 0;
    transform: translateX(-50px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.title h1{
  color: var(--white-black-color);
}

.project-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 50px 6.6%;
  box-sizing: border-box;
  padding-top: 20px;
}

.project {
  color: #fff;
  border: 1px solid var(--white-black-color);
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  padding: 10px;
  margin-bottom: 30px;
  width: 600px;
  height: 200px;
  padding-left: 30px;
  position: relative;
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project:hover{
  transform: scale(1.03);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
}

.project::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 1;
  border-radius: 5px;
}

.project-content {
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 2;
  height: 100%;
}

.project-btn-margin{
  margin: 0 10px 10px 0;
}

.project h2 {
  font-size: 20px;
  margin: 0 0 5px;
}

.project p {
  font-size: 14px;
  margin: 0;
  width: 370px;
}

.edit-button{
  margin-top: 20px;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  background-color: var(--secondary-color);
  color: var(--white-black-color);
  border-radius: 3px;
  text-align: center;
}

.card img {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

.card h2 {
  font-size: 20px;
  margin: 10px 0;
}

.card p {
  color: #718096;
  font-size: 14px;
  margin: 10px 0;
}

.card button {
  background-color: var(--quaternary-color);
  display: flex;
  align-items: center;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  font-weight: 600;
  padding: 12px 30px;
  transition: background-color 0.3s ease-in-out;
}

.card button:hover {
  background-color: var(--primary-hover-color);
  color: #000;
}

.plus-icon {
  display: inline-block;
  width: 20px; 
  height: 20px; 
  background-image: url('@/assets/plus.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-left: 20px;
}

</style>
