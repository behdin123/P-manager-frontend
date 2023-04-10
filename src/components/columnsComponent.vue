<template>
    <div class="board">

        <div class="column" @dragover.prevent @drop.prevent="drop(index, $event)" v-for="(column, index) in columns"
            :key="index">

            <div class="column-list">

                <div class="column-header">{{ column.header }}</div>

                <div class="card-overview">


                    <div class="card" v-for="(card, cardIndex) in column.cards" :key="cardIndex" :draggable="true"
                        @dragstart="dragStart(cardIndex, index, $event)" @dragend="dragEnd($event)">
                        <div class="card-header">{{ card.header }}</div>
                        <div class="card-description">{{ card.description }}</div>
                    </div>


                </div>

                <div class="add-card" @click="addCard(index)">
                    <span class="plus">+</span>
                    <span>Add a card...</span>
                </div>

            </div>

        </div>

    </div>
</template>
  
<script setup>
import { columns, draggingCard, draggingColumn, hoveredColumn, addCard, dragStart, dragEnd, dragEnter, dragLeave, drop } from '../modules/columns';
/* import tasksComponent from '../components/tasksComponent.vue' */
</script>

<script>
/* export default {
    name: 'column',
    components: {
        tasksComponent
    }
} */
</script>
  

<style lang="scss" scoped>
@import "@/assets/global.scss";

.placeholder {
    background: #5E6C84;
    width: 100%;
    margin: 10px 0;
    height: 80px;
}

.plus {
    display: inline-block;
    font-size: 22px;
    font-weight: 400;
    margin-right: 10px;
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
}

.board {
    display: flex;
    justify-content: space-between;
    padding: 60px 5%;
}

.dragging {
    background-color: var(--primary-color);
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2) !important;
}

.column {
    width: 30%;
    box-shadow: 0 1px 0 rgba(9, 30, 66, .25);
    background-color: var(--column-color);
    border-radius: 3px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    margin-right: 12px;
    min-height: 40px;
    width: 25%;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 8px;

}

.column-list {
    border-radius: 3px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    max-height: 100%;
    position: relative;
    white-space: normal;
    width: 100% !important;
}

.card-overview {
    overflow-x: hidden;
    overflow-y: auto;
    max-height: 45vh;
}

.column:last-child {
    margin-right: 0;
}

.column-header {
    font-weight: bold;
    padding: 8px;
    margin-bottom: 8px;
    color: var(--tertiary-color);
}

.card {
    background-color: var(--card-color);
    color: var(--tertiary-color);
    border-radius: 3px;
    box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
    cursor: grab;
    margin-bottom: 8px;
    max-width: 300px;
    min-height: 20px;
    padding: 8px;
    width: 90%;
    height: auto;
}

.card:hover {
    opacity: 0.8;
}

.card-header {
    font-weight: bold;
    font-weight: 600;
    margin-bottom: 8px;
}

.card-description {
    color: var(--tertiary-color);
    margin-bottom: 8px;
}

.column-header {
    font-size: 14px;
    font-weight: bolder;

}

.card-header,
.card-description,
.add-card {
    font-size: 14px;
}

.add-card {
    display: flex;
    align-items: center;
    background-color: var(--tertiary-color);
    border-radius: 3px;
    color: var(--primary-color);
    cursor: pointer;
    margin-bottom: 8px;
    max-width: 300px;
    padding: 8px;
    padding-left: 0 !important;
    transition: background-color 0.3s ease-in-out;
}

.add-card:hover {
    background-color: var(--tertiary-color);
}
</style>
