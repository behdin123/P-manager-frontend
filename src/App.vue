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

// importing navigation & footer from components
import footerComponent from './components/footerComponent.vue';
import navigationComponent from './components/navigationComponent.vue';

import { ref, watchEffect } from 'vue';

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
  --primary-hover-color: #FED201;
  --background-color: #212121;
  --column-color: #474747;
  --card-color: #424242;
}
</style>
