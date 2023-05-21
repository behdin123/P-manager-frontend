<template>

    <div class="create-team-container" v-if="showTeamCreation">

        <div class="create-team-popup">

            <h2>Create New Team</h2>

            <label class="input-label"> Name:
                <input type="text" v-model="newTeam.name" />
            </label>

            <label class="input-label"> Team members:
                <input type="text" v-model="usernames" />
            </label>

            <label class="input-label"> Description:
                <input type="text" v-model="newTeam.description" />
            </label>

            <button class="button Update-button" @click="handleCreateTeam">Create Team</button>

            <!-- The close button -->
            <button class="close" @click="$emit('close')">x</button>

        </div>

    </div>

</template>


<script setup>
import {
    createTeam,
    newTeam
} from '../../modules/Crud_operator/Team/teamCreateCrud';

// Tilføj 'defineProps' import
import { ref, defineProps, defineEmits } from 'vue';

// Definer 'showTeamCreation' prop
const props = defineProps({
  showTeamCreation: Boolean,
});

const emit = defineEmits(['close', 'teamCreated']);

// Opret en ny ref til at gemme brugernavne som en streng
let usernames = ref('');

const handleCreateTeam = async () => {
  // Konverter kommasepareret brugernavne til array
  newTeam.value.users = usernames.value.split(',').map(username => username.trim());
  const isSuccess = await createTeam();
  if (isSuccess) {
    emit('teamCreated');
    emit('close'); // Close the popup if the team was created successfully
  }
};

</script>

<style lang="scss" scoped>
@import "@/assets/global.scss";
.create-team-container {
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

.create-team-popup {
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

.create-team-popup h2 {
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

.close {
    position: absolute;
    right: 1rem;
    top: 1rem;
    background-color: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
}
</style>