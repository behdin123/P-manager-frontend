<template>

    <div class="create-project-container" v-if="showProjectCreation">

        <div class="create-project-popup">

            <h2>Create New Project</h2>

            <label class="input-label"> Title:
                <input type="text" v-model="newProject.title" />
            </label>

            <label class="input-label"> Description:
                <input type="text" v-model="newProject.description" />
            </label>

            <label class="input-label"> Image:
                <input class="extra-margin" type="file" @change="onFileChange" accept="image/*"/>
            </label>

            <label class="input-label"> Tags:
                <input type="text" v-model="tagsInput" placeholder="Enter tags separated by commas" />
            </label>

            <label class="input-label"> Private:
                <input type="checkbox" v-model="newProject.private" />
            </label>

            <button class="button Update-button" @click="handleCreateProject">Create Project</button>

            <!-- The close button -->
            <button class="close" @click="$emit('close')">x</button>

        </div>

    </div>

</template>


<script setup>
import {
    createProject,
    tagsInput,
    newProject,
    onFileChange,
} from '../../modules/Crud_operator/Project/projectCreateCrud';

// Tilføj 'defineProps' import
import { defineProps, defineEmits } from 'vue';

// Definer 'showProjectCreation' prop
const props = defineProps({
  showProjectCreation: Boolean,
});

const emit = defineEmits(['close']);

const handleCreateProject = async () => {
  const isSuccess = await createProject();
  if (isSuccess) {
    emit('close'); // Close the popup if the project was created successfully
  }
};

</script>

<style lang="scss">
@import "@/assets/global.scss";

/* Styling for the popup */
.create-project-container {
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

.create-project-popup {
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

.create-project-popup h2{
    margin-top: 0;
    margin-bottom: 40px;
    color: var(--white-black-color);
}

.input-label {
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: var(--white-black-color);
    margin: 10px;
}

.extra-margin{
    width: 32%;
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
</style>
