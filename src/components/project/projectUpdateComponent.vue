<template>
    <div class="update-project-container">

      <div class="update-project-popup">

        <h2>Update Project</h2>

        <div class="buttons-container">
            <button class="button" @click="toggleEditMode">{{ buttonText }}</button>
        </div>

          <!-- Input fields for editing mode -->

          <label class="input-label"> Title:
            <input v-if="editMode" type="text" v-model="updatedProject.title" />
            <span  v-else> {{ project.title }} </span>
          </label>
  
          <label class="input-label"> Description:
            <input v-if="editMode" type="text" v-model="updatedProject.description" />
            <span class="project-description"  v-else> {{ project.description }} </span>
          </label>
  
          <label class="input-label"> Tags:
            <input v-if="editMode" type="text" v-model="updatedProject.tagsInput" placeholder="Enter tags separated by commas" />
            <span v-else>{{ project.tags.join(', ') }}</span>
          </label>
  
          <label class="input-label"> Private:
            <input 
                v-if="editMode" 
                type="checkbox" 
                :checked="project.private"
                @change="updatedProject.private = $event.target.checked"
            />

            <span v-else>{{ project.private ? 'Yes' : 'No' }}</span>
          </label>

          <label class="input-label"> Project Background Image:
            <input v-if="editMode" class="extra-margin" type="file" @change="onFileChange" accept="image/*" />
            <span  v-else class="project-image" :style="{ backgroundImage: projectBackgroundImage(project) }"></span>
          </label>
          
          <button v-if="editMode" class="button Update-button" @click="updateAndClose">Update Project</button>
          <button v-else class="button button-color" @click="removeProjectAndClose">Remove</button>
  
        <!-- Close button -->
        <button class="close" @click="$emit('update-finished')">x</button>

      </div>

    </div>
  </template>



<script setup>
import { ref, watchEffect, defineProps } from 'vue';

import {
  onFileChange,
  handleUpdateProject,
  updatedProject,
  tagsInput,
} from '../../modules/Crud_operator/Project/projectUpdateCrud';

import {
  projectBackgroundImage,
  onUpdateFinished, 
} from '../../modules/Main_logic/Home';

import { removeProject } from '../../modules/Crud_operator/Project/projectRemoveCrud';


const props = defineProps({
  project: Object,
});

watchEffect(() => {
  const newProject = props.project;
  console.log("New project in watchEffect:", newProject);
  if (newProject) {
    Object.assign(updatedProject.value, newProject);
    tagsInput.value = newProject.tags.join(', ');
  }
});

// handleUpdateProject and close the popup on update-finished
const updateSuccess = ref(false);

const updateAndClose = async () => {
  updateSuccess.value = await handleUpdateProject();
};

watchEffect(() => { 
    if (updateSuccess.value) { 
        onUpdateFinished();
    }
});

const removeProjectAndClose = async () => {
  await removeProject(props.project._id);
  onUpdateFinished();
};


// Switch between edit mode and shwo information mode
const editMode = ref(false);
const buttonText = ref('Switch to Edit Mode');

const toggleEditMode = () => {
  editMode.value = !editMode.value;
  buttonText.value = editMode.value ? 'Cancel' : 'Switch to Edit Mode';
};

</script>




<style lang="scss" scoped>
@import "@/assets/global.scss";
.update-project-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.update-project-popup {
    background-color: var(--primary-color);
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    color: var(--tertiary-color);
    width: 45%;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
    border-radius: 8px;
}

.project-description{
    width: 300px;
    text-align: right;
}

.input-label {
    align-items: center;
}

.project-image{
    width: 200px;
    height: 100px;
    background-position: center; /* Center the image */
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: cover;
    border-radius: 5px;
}

.buttons-container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 1rem;
}

.button-color{
  background-color: #E53935;
}

</style>