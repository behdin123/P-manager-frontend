<template>
    <div class="main">
        <div class="welcome-page">
            <div class="first-section">
                <div data-aos="fade-right" data-aos-duration="1000" class="welcome-page-header">
                    <h1>Welcome to P-Manager</h1>
                    <p class="Slogan">Our solution for your project management</p>
                </div>
                <div data-aos="fade-right" data-aos-delay="500" data-aos-duration="1000" data-aos-easing="ease-in-sine"
                    class="welcome-page-description">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed venenatis augue ac ligula bibendum
                        lobortis.
                        Praesent dignissim justo eget est auctor, in blandit turpis vestibulum. Nam bibendum odio eget sem
                        fermentum, a ullamcorper velit tincidunt. Suspendisse vel lorem in nisl rutrum bibendum quis vel
                        eros.
                        Sed ac nulla euismod, mollis urna eu, efficitur magna.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed venenatis augue ac ligula bibendum
                        lobortis.
                        Praesent dignissim justo eget est auctor, in blandit turpis vestibulum.
                    </p>
                </div>
            </div>
            <div data-aos="fade-up" data-aos-delay="500" data-aos-duration="1500" class="cta-buttons">
                <button class="cta-button login-button" @click="openPopup(1)">Log ind</button>
                <button class="cta-button register-button" @click="openPopup(2)">Sign up</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { openPopup } from '../modules/login.js';


</script>

<style lang="css" scoped>
.main {
    background-image: url('../assets/welcome-background.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    height: 86vh;
    display: flex;
    align-content: center;
}

.Slogan{
    margin-bottom: 15px;
}

.first-section {
    display: flex;
    flex-direction: column;
    width: 60%;
}

.welcome-page {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 5%;
    margin: 0 50px;
    margin-top: 80px !important;
    width: 100%;
}

.welcome-page-header {
    max-width: 100%;
    color: #ffffff;
}

.welcome-page-header h1 {
    font-size: 3.5rem;
    margin-bottom: 45px;
}

.welcome-page-header p {
    font-size: 1.5rem;
    color: #ffffff;
}

.welcome-page-description {
    max-width: 60%;
    color: #ffffff;
}

.cta-buttons {
    display: flex;
    justify-content: center;
    margin-top: 50px;
    width: 40%;
}

.cta-buttons button {
    background-color: var(--quaternary-color);
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    transition: background-color 0.2s ease-in-out;
}

.cta-button {
    padding: 10px 20px;
    font-size: 18px;
    border: none;
    border-radius: 5px;
    margin: 0 20px;
    cursor: pointer;
}

.cta-button:hover {
    background-color: var(--primary-hover-color);
}
</style>