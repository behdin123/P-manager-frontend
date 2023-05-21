<template>

        <div class="team-container">
            <div class="team" v-for="team in teams" :key="team._id">
                <div class="team-content">

                    <div>
                        <h3>{{ team.name }}</h3>
                        <p>{{ team.description }}</p>
                    </div>

                    <div class="user-information-container">
                        <div class="user-information" v-for="user in team.users" :key="user._id">
                            <img :src="`http://localhost:3000/${user.profile_image}`" alt="Profile Picture" class="user-short__img">
                            <b>{{ user.first_name }}</b>
                            <b>{{ user.last_name }}</b>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        
</template>

<script setup>
import { onMounted } from 'vue';

import { profile_image } from '../../modules/Crud_operator/User/userGetCrud'

import {
    getTeams,
    teams
} from '../../modules/Crud_operator/Team/teamGetCrud';


onMounted(async () => {
  await getTeams();
});

</script>



<style lang="scss" scoped>
@import "@/assets/global.scss";

body {
  margin: 0;
  padding: 0;
}

.team-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  color: var(--white-black-color);
  width: 100%;
  padding: 50px 6.6%;
  box-sizing: border-box;
  padding-top: 50px;
}

.team {
  background-color: var(--column-backgroundColor);
  border: 1px solid var(--white-black-color);
  border-radius: 5px; 
  padding: 10px;
  margin-bottom: 30px;
  width: 600px;
  height: 200px;
  padding-left: 30px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.team:hover {
  transform: scale(1.03);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
}

.team-content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.team h3 {
  font-size: 20px;
  margin: 0 0 5px;
}

.team p {
  font-size: 14px;
  margin: 0;
  width: 370px;
}

.user-information-container{
    display: flex;
}

.user-information{
    width: 30%;
    display: flex;
    align-items: center;
    margin-right: 30px;
}

.user-short__img {
  width: 2.5rem !important;
  height: 2.5rem !important;
}

.user-information b{
    margin-right: 5px;
    font-size: 13px;
}
</style>