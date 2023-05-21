<template>

    <div class="team-container">

        <button class="button Update-button" @click="getTeams">Get Teams</button>

        <div class="team-list">
            <div v-for="team in teams" :key="team.id">
                <h3>{{ team.name }}</h3>
                <p>{{ team.description }}</p>
            </div>
        </div>

    </div>

</template>

<script setup>
import {
    getTeams,
    teams
} from '../../modules/Crud_operator/Team/teamGetCrud';

</script>



<style lang="scss" scoped>

.team-container{
    background-color: aqua;
    height: 100vh;
}


</style>