<template>
    <div class="update-task-container">

        <div class="update-task-popup">

            <h2>Update Task</h2>

            <div class="buttons-container">
                <button class="button" @click="toggleEditMode">{{ buttonText }}</button>
            </div>

            <!-- Input fields for editing mode -->
            <div class="task-info-container">
                <label class="input-label"> <b> Title: </b>
                    <input v-if="editMode" type="text" v-model="updatedTask.title" />
                    <span v-else> {{ task.title }} </span>
                </label>

                <label class="input-label"> <b> Description: </b>
                    <textarea v-if="editMode" v-model="updatedTask.description"></textarea>
                    <span v-else> {{ task.description }} </span>
                </label>
            </div>



            <button v-if="editMode" class="button Update-button" @click="updateAndCloseWrapper">Update Task</button>

            <!-- Close button -->
            <button class="close" @click="$emit('close')">x</button>

            <button v-if="!editMode" class="button button-remove" @click="RemoveAndCloseWrapper">Delete Task</button>

        </div>

    </div>
</template>

<script setup>

import { ref, watchEffect, defineProps } from 'vue';

import {
    updatedTask,
    updateAndClose
} from '../../modules/Crud_operator/task/taskUpdateCrud';

import {
    deleteAndClose
} from '../../modules/Crud_operator/task/taskRemoveCrud';

// Add defineProps  
const props = defineProps({
  task: Object,
  projectId: String,
  columnId: String,
});

// Add defineEmits
const emit = defineEmits(['close', 'taskUpdated', 'update-finished', 'task-deleted'])

// Pass props and emit to the updateAndClose function
const  RemoveAndCloseWrapper= () => {
  deleteAndClose(props, emit);
};

// Pass props and emit to the updateAndClose function
const updateAndCloseWrapper = () => {
  updateAndClose(props, emit);
};

watchEffect(() => {
  if (props.task) {
    Object.assign(updatedTask.value, props.task);
  }
});



// Switch between edit mode and show information mode
const editMode = ref(false);
const buttonText = ref('Switch to Edit Mode');

const toggleEditMode = () => {
  editMode.value = !editMode.value;
  buttonText.value = editMode.value ? 'Cancel' : 'Switch to Edit Mode';
};
</script>



<style lang="scss" scoped>
@import "@/assets/global.scss";
.update-task-container {
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

.update-task-popup {
    background-color: var(--primary-color);
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    color: var(--tertiary-color);
    width: 30%;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
    border-radius: 8px;
}

.input-label {
    width: auto !important;
    display: flex;
    justify-content: space-between;
    color: var(--white-black-color);
    margin: 10px;
    margin-bottom: 20px;
}

.task-info-container{
    margin: 30px 0;
    width: 100%;
}

span{
  width: 55%;
  text-align: right;
}

input{
    width: 200px;
}

textarea{
    max-width: 200px;
    min-width: 200px;
    max-height: 47px;
    min-height: 47px;
    font-family: "Open Sans", sans-serif;
    font-size: 12px;
}

.update-task-popup h2{
    margin-top: 0;
}

.buttons-container {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 1rem;
}

.button-remove{
    background-color: #E53935;
}

.Update-button{
    background-color: #8BC34A;
}
</style>