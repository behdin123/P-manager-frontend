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
                        you can expect a seamless project management experience. With our user-friendly interface, you can 
                        easily create and organize projects, ensuring that no task is left behind. 
                        Whether it's for work, school, or any other purpose, our platform empowers you to stay in 
                        control and achieve your goals.
                    </p>
                    <p>
                        Join us and discover the joy of efficient project management. Stay inspired, stay organized, 
                        and conquer your goals with our Project Management Web Application.
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
import { openPopup } from '../modules/Crud_operator/User/login.js';


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
    max-width: 70%;
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