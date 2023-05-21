<template>

    <div class="create-team-container" v-if="showTeamCreation">

        <div class="create-team-popup">

            <h2>Create New Team</h2>

            <label class="input-label"> Name:
                <input type="text" v-model="newTeam.name" />
            </label>

            <label class="input-label"> Username:
                <input type="text" v-model="newTeam.username" />
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
import { defineProps, defineEmits } from 'vue';

// Definer 'showTeamCreation' prop
const props = defineProps({
  showTeamCreation: Boolean,
});

const emit = defineEmits(['close']);

const handleCreateTeam = async () => {
  const isSuccess = await createTeam();
  if (isSuccess) {
    emit('close'); // Close the popup if the team was created successfully
  }
};

</script>

<style lang="scss" scoped>

</style>