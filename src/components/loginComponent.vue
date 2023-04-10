<template>
  <div class="login-entry-div">
    <div class="entry">
      <a class="open-popup" @click="openPopup(1)"><b>Login</b></a>
      &nbsp; or &nbsp;
      <a class="open-popup" @click="openPopup(2)"><b>Sign up</b></a>
    </div>

    <div class="separator"></div>

    <div class="entry">
      <a href="/logoutFunction"><b>Log out</b></a>
    </div>
  </div>

  <div class="popup-container" v-show="popupVisible" @click.self="closePopup">
    <div class="popup">
      <div class="popup-content">
        <!-- login form -->
        <form id="login-form" v-show="popupContent === 1" @submit.prevent="submitLogin">
          <h2>Login</h2>
          <input type="text" placeholder="Username" v-model="username">
          <input type="password" placeholder="Password" v-model="password">
          <button type="submit">Login</button>
        </form>

        <!-- registration form -->
        <form id="register-form" v-show="popupContent === 2" @submit.prevent="submitRegister">
          <h2>Sign up</h2>
          <input type="text" placeholder="Username" v-model="username">
          <input type="email" placeholder="Email" v-model="email">
          <input type="password" placeholder="Password" v-model="password">
          <input type="password" placeholder="Confirm Password" v-model="confirmPassword">
          <button type="submit">Sign up</button>
        </form>

      </div>
      <a class="close-popup" href="#" @click="closePopup">X</a>
    </div>
  </div>
</template>


<script setup>
import { popupVisible, popupContent, openPopup, closePopup, submitLogin, submitRegister } from '../modules/login.js';

</script>



<style lang="scss" scoped>
@import "@/assets/global.scss";

.login-entry-div {
  display: flex;
  align-items: center;
  color: var(--tertiary-color);;
}

.separator {
  height: 20px;
  border-left: 2px solid var(--tertiary-color);
  margin: 10px 0;
}

.popup-container {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.open-popup{
  cursor: pointer !important;
}

.popup {
  position: relative;
  margin: 10% auto;
  padding: 20px;
  background-color: var(--primary-color);
  width: 80%;
  max-width: 500px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
}

.popup h2 {
  margin-top: 0;
  font-size: 24px;
  font-weight: bold;
  color: var(--tertiary-color);
}

.popup input[type="text"],
.popup input[type="email"],
.popup input[type="password"],
.popup button[type="submit"] {
  display: block;
  width: 100%;
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
}

.popup input[type="text"]:focus,
.popup input[type="email"]:focus,
.popup input[type="password"]:focus {
  outline: none;
  border-color: var(--quaternary-color);
}

.popup button[type="submit"] {
  background-color: var(--quaternary-color);
  color: #fff;
  cursor: pointer;
  border: none;
  font-size: 18px;
  font-weight: bold;
}

.popup button:hover{
  background-color: var(--primary-hover-color);
}

.close-popup {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  text-decoration: none;
  color: var(--tertiary-color);
}

.close-popup:hover {
  color: var(--primary-hover-color);
}
</style>