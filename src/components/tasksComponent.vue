<!-- <template>
  <div class="card-overview">

                    <div class="placeholder" v-show="draggingColumn === index && draggingCard === -1 && hoveredColumn === index"
                         @dragenter="dragEnter(index, $event)" @dragleave="dragLeave($event)"
                         @drop="drop(index, $event)">
                        Drop Here
                    </div>

                        
                    <div class="card" v-for="(card, cardIndex) in column.cards" :key="cardIndex"
                         :draggable="true" @dragstart="dragStart(cardIndex, index, $event)"
                         @dragend="dragEnd($event)">
                        <div class="card-header">{{ card.header }}</div>
                        <div class="card-description">{{ card.description }}</div>
                    </div>
                   

                </div>
</template>

<script setup>
import { columns, draggingCard, draggingColumn, hoveredColumn, addCard, dragStart, dragEnd, dragEnter, dragLeave, drop } from '../modules/columns';
</script>

<style lang="scss" scoped>

</style> -->