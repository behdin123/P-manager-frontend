<template>
  <main>

    <h1>Plain templates for your Project management</h1>

    <div class="flex">

      <div class="card" id="template-cards">
        <h2>Purple Template</h2>

        <img src="../assets/purple-theme.png" alt="Image description">

        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

        <button @click="{ saveBackgroundImage('./src/assets/purple-theme.png'); $router.push('/template')  }">Create Project</button>
      </div>

      <div class="card" id="template-cards">
        <h2>Black Template</h2>

        <img src="../assets/black-theme.png" alt="Image description">

        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

        <button @click="{ saveBackgroundImage('./src/assets/black-theme.png'); $router.push('/template')  }">Create Project</button>
      </div>

      <div class="card" id="template-cards">
        <h2>Green Template</h2>
        <img src="../assets/green-theme.png" alt="Image description">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <button @click="{ saveBackgroundImage('./src/assets/green-theme.png'); $router.push('/template')  }">Create Project</button>
      </div>

      <div class="card" id="template-cards">
        <h2>Red Template</h2>
        <img src="../assets/Red-theme.png" alt="Image description">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <button @click="{ saveBackgroundImage('./src/assets/Red-theme.png'); $router.push('/template')  }">Create Project</button>
      </div>

      <div class="card">
        <h2>Purple texture - Template</h2>
        <img src="../assets/purple-theme-texture.png" alt="Image description">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <button @click="{ saveBackgroundImage('./src/assets/purple-theme-texture.png'); $router.push('/template')  }">Create Project</button>
      </div>

      <div class="card">
        <h2>Black texture - Template</h2>
        <img src="../assets/black-theme-texture.png" alt="Image description">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <button @click="{ saveBackgroundImage('./src/assets/black-theme-texture.png'); $router.push('/template')  }">Create Project</button>
      </div>

      <div class="card">
        <h2>Green texture - Template</h2>
        <img src="../assets/green-theme-texture.png" alt="Image description">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <button @click="{ saveBackgroundImage('./src/assets/green-theme-texture.png'); $router.push('/template')  }">Create Project</button>
      </div>

      <div class="card">
        <h2>Red texture - Template</h2>
        <img src="../assets/red-theme-texture.png" alt="Image description">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <button @click="{ saveBackgroundImage('./src/assets/red-theme-texture.png'); $router.push('/template')  }">Create Project</button>
      </div>

      <!-- more templates can be added here -->

    <h1>Your Projects overview</h1>

    </div>

    <div class="project-container">

      <div class="project">
        <h2>Projekt Name</h2>
        <p>Description of the project.</p>
      </div>
      <div class="project">
        <h2>Projekt Name</h2>
        <p>Description of the project.</p>
      </div>
      <div class="project">
        <h2>Projekt Name</h2>
        <p>Description of the project.</p>
      </div>
      <div class="project">
        <h2>Projekt Name</h2>
        <p>Description of the project.</p>
      </div>


    </div>
  </main>
</template>

<script setup>

import { useRouter } from 'vue-router'
import { defineProps } from 'vue';

const props = defineProps({
  dark: {},
});


const router = useRouter()

const saveBackgroundImage = (imageSrc) => {
  sessionStorage.setItem('backgroundImage', imageSrc)
}

const createProject = () => {
  router.push('/template')
}
    

</script>



<style lang="scss" scoped>

@import "@/assets/global.scss";

body {
  
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

main {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  padding: 0 0 50px 0;
  margin-top: 95px !important;
  background-color: var(--secondary-color);
}

main h1 {
  margin-top: 80px;
  font-size: 30px;
  font-weight: bold;
  color: var(--tertiary-color);
}

.project-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 50px 6.6%;
  box-sizing: border-box;
}

.project {
  background-color: var(--primary-color);
  color: var(--tertiary-color);
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  padding: 10px;
  margin-bottom: 30px;
  width: 200px;
}

.project h2 {
  font-size: 20px;
  margin: 0 0 5px;
}

.project p {
  font-size: 14px;
  margin: 0;
}

.flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 30px 0;
}

.card {
  background-color: var(--secondary-color);
  color: var(--tertiary-color);
  border-radius: 3px;
  margin: 10px;
  padding: 10px;
  text-align: center;
  width: 300px;
}

.card img {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

.card h2 {
  font-size: 20px;
  margin: 10px 0;
}

.card p {
  color: #718096;
  font-size: 14px;
  margin: 10px 0;
}

.card button {
  background-color: var(--quaternary-color);
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  font-weight: 600;
  padding: 12px 30px;
  transition: background-color 0.2s ease-in-out;
}

.card button:hover {
  background-color: var(--primary-hover-color);
}
</style>
