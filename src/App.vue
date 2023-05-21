<template >
  <div id="app" :class="{ 'dark-theme': darkMode }">
    <!-- Header section -->
    <navigation-component :toggle-dark-mode="toggleDarkMode" />

    <!-- page view -->
    <RouterView />

    <footer-component />
  </div>
</template>


<script setup>

import { RouterView } from 'vue-router'
import Cookies from 'js-cookie';
import { isLoggedIn } from './modules/Crud_operator/User/login.js';

// Importing navigation & footer from components
import footerComponent from './components/partials/footerComponent.vue';
import navigationComponent from './components/partials/navigationComponent.vue';

import { ref, watchEffect, onMounted } from 'vue';

// chekcing if their is a token saved as a coockie, and if so it means that the user is logged in and theirfor the isLoggedIn value will be sat to true
onMounted(() => {
  const token = Cookies.get('jwt');
  if (token) {
    isLoggedIn.value = true;
  }
});

//Dark Mode
const darkMode = ref(false);

watchEffect(() => {
  localStorage.setItem('darkMode', JSON.stringify(darkMode.value));
});

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value;
};

</script>


<style lang="scss">
@import "@/assets/global.scss";


.dark-theme {
  --primary-color: #1d1d1d ;
  --secondary-color: #171C22;
  --tertiary-color: #ffffff;
  --quaternary-color: #3563FF;
  --quaternary-hover-color: #2649ba;
  --primary-hover-color: #FED201;
  --background-color: #212121;
  --white-black-color: #ffffff;

  --column-backgroundColor: #2d2d2d;
  --card-backgroundColor: #252727;
}

</style>
