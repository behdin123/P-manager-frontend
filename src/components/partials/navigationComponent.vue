<template>
  <header>
    <img class="logo" src="@/assets/logo.png" />
    <div class="wrapper">
      <!-- Navigation -->
      <nav>

        <div class="nav-links">
          <RouterLink to="/">Frontpage</RouterLink>
          <RouterLink v-if="isLoggedIn" to="/Home">Home</RouterLink>
          <RouterLink v-if="isLoggedIn" to="/team">Teams</RouterLink>
        </div>

        <button class="share" @click="toggleModal">Share</button>
        <ShareModal v-model="modelValue" />

        <!-- login & register & logout -->
        <div class="login-div" v-bind:class="{ 'login-div-loggedin': isLoggedIn }">
          <login-component />
        </div>

        <div class="user-short" v-if="isLoggedIn" @click="showPopup = !showPopup">
          <img :src="profile_image" alt="Profile Picture" class="user-short__img">
          <p class="user-short-name">{{ capitalizedUsername() }}</p>
        </div>

        <div v-if="showPopup">
           <UserProfileComponent />
        </div>

        <label class="switch">
          <input @click="toggleDarkMode" type="checkbox"/>
          <span class="slider round"></span>
        </label>

      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, defineProps, watch} from 'vue';
import { RouterLink } from 'vue-router';
import LoginComponent from '../user/loginComponent.vue';
import ShareModal from '../ShareProjectComponent.vue';
import UserProfileComponent from '../user/userProfileComponent.vue';
import { useRouter } from 'vue-router';

import { isLoggedIn } from '../../modules/Crud_operator/User/login.js';

import { capitalizedUsername, showPopup } from '../../modules/Main_logic/UserProfile';

import { profile_image } from '../../modules/Crud_operator/User/userGetCrud'

const components = {
  LoginComponent,
  ShareModal,
  UserProfileComponent,
}; 

const props = defineProps({
  title: {
    type: Boolean,
    required: false,
  },
  toggleDarkMode: Function,
});

const modelValue = ref(false);

//share project popup container
const toggleModal = () => {
  modelValue.value = !modelValue.value;
};

const router = useRouter();

//checking if the user is logged out then it should be send back to the frontpage
watch(isLoggedIn, (newIsLoggedIn) => {
  if (!newIsLoggedIn) {
    router.push('/');
  }
});


</script>




<style lang="scss">
@import "@/assets/global.scss";

nav{
  position: relative;
}

.share{
  margin-right: 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 31%;
  left: 95%;
  right: 0;
  bottom: 0;
  background-color: var(--quaternary-color);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: var(--primary-hover-color);
}

input:focus + .slider {
  box-shadow: 0 0 1px #D9C4A9;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
  width: 4.7%;
  height: 34%;
}

.slider.round:before {
  border-radius: 50%;
}

header {
  line-height: 1.5;
  max-height: 100vh;
  display: flex;
  justify-content: space-between;
  padding: 0 5%;
  font-size: 13px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: var(--primary-color);
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
  z-index: 999;
}

a:link {
  text-decoration: none;
}

.nav-links {
  margin-right: 50px;
}

.login-div{
  margin-right: 100px;
}

.login-div-loggedin{
  margin-right: 30px !important;
}

.user-short {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 110px;
}

.user-short__img {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin-right: 0.5rem;
}

.user-short-name{
  font-weight: bold;
  color: var(--white-black-color);
}

.user-short-name:first-letter{
  text-transform: capitalize !important;
}

header a {
  position: relative;
  color: var(--tertiary-color);
  text-decoration: none;

}

a:hover {
  color: var(--tertiary-color);
}

a::before {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--tertiary-color);
  transform: scaleX(0);
  transition: transform 0.2s ease-in-out;
}

a:hover::before {
  transform: scaleX(1);
  color: var(--tertiary-color);
}

.logo {
  display: block;
  width: 80px;
  height: auto;
}

.wrapper {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

nav {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
}
</style>