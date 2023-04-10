<template>
  <div class="template-page" :style="{ backgroundImage: `url(${backgroundImage})` }">
    <columnsComponent />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import columnsComponent from '../components/columnsComponent.vue'

window.scrollTo(0, 0);

const backgroundImage = ref('')

onMounted(() => {
  backgroundImage.value = sessionStorage.getItem('backgroundImage')
})
</script>




<style lang="css" scoped>
.template-page{
  height: 87vh !important;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
  margin-top: 95px;
}
</style>