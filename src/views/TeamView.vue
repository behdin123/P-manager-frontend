<template>
    <div>


        <!-- teams component -->
        <div class="flex">
            <div>
                <teamGetComponent @close="closeProjectCreation" :showProjectCreation="showProjectCreation" />
            </div>
        </div>


    </div>
</template>

<script setup>
import teamGetComponent from '../components/team/teamGetComponent.vue';

</script>



<style lang="scss" scoped>


</style>