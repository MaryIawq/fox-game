<script setup>
import {onMounted, onUnmounted, ref, watch} from "vue";

import BackgroundItemsComponent from "@/components/background-items-component.vue";
import ScoreComponent from "@/components/score-component.vue";
import HouseComponent from "@/components/house-components/house-component.vue";
import FloorComponent from "@/components/floor-component.vue";

const fox = {
  position: ref(0),
  lookingLeft: ref(false),
  width: 150
}

const handleKeyPress = (event) => {
  if (event.code === 'ArrowLeft') {
    if (fox.position.value > 0) {
      fox.position.value -= 15;
      fox.lookingLeft.value = true;
    }
  } else if (event.code === 'ArrowRight') {
    if (fox.position.value + fox.width < window.innerWidth - 50) {
      fox.position.value += 15;
      fox.lookingLeft.value = false
    }
  }
}



onMounted(() => {
  window.addEventListener('keydown', handleKeyPress)
})
</script>

<template>
  <div class="background">
    <background-items-component></background-items-component>
    <score-component></score-component>
    <div class="main">
      <div class="items-container">
        <img class="item" src="">
      </div>
      <img class="fox" src="/fox.png" alt="game-character" :style="{ left: `${fox.position.value}px`, transform: fox.lookingLeft.value ? 'scaleX(-1)' : 'scaleX(1)' }">
      <house-component></house-component>
      <floor-component></floor-component>
    </div>
  </div>
</template>

<style scoped>
.background {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url(/background/background.png);
}

.main {
  height: 100vh;
  position: relative;
  margin-left: 20px;
  margin-right: 20px;
  background-color: rgba(83, 188, 201, 0.5);
}

.fox {
  position: absolute;
  bottom: 30px;
  width: 150px;
  z-index: 3
}
.item {
  width: 20px;
  position: absolute;
}
</style>
