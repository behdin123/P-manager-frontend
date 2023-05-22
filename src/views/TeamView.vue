<template>

    <div class="team-page-container">

        <div class="title-container">
            <h1>Teams Overview</h1>
            <button class="button card" @click="showTeamCreation = true">
                Create Team
                <span class="plus-icon"></span>
            </button>
        </div>

        <div class="line"></div>

        <!-- Reading all the teams for the current user - component -->
        <teamGetComponent  :refresh-teams="refreshTeams"/>

        <!-- team creating popup - component -->
        <teamCreateComponent :showTeamCreation="showTeamCreation" @close="showTeamCreation = false" @team-created="refreshTeams"/>

    </div>

</template>

<script setup>
import teamGetComponent from '../components/team/teamGetComponent.vue';
import teamCreateComponent from '../components/team/teamCreateComponent.vue';

import { ref } from 'vue';

import { refreshTeams } from '../modules/Main_logic/Team';

let showTeamCreation = ref(false);

</script>



<style lang="scss" scoped>
.team-page-container{
    margin-top: 95px !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 95px !important;
    background-color: var(--secondary-color);
    width: 100%;
    min-height: 100vh;
}

.team-page-container h1 {
  font-size: 30px;
  font-weight: bold;
  color: var(--tertiary-color);
  text-align: center;
}

.title-container {
  display: flex;
  align-items: center;
  margin-top: 15px;
  width: 87%;
  justify-content: space-between;
}

.button.card {
  background-color: var(--quaternary-color);
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 12px 30px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease-in-out;
}
.button.card:hover {
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