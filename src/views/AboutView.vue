<template>
  <div class="about">
    <columns-component />
  </div>
</template>


<script>
import columnsComponent from '../components/columnsComponent.vue'


export default {
  name: 'About',
  components: {
    columnsComponent
  }
}
</script>

<style scoped>

.about{
  margin-top: 95px;
}

</style>
