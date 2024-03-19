<script setup>
import {onMounted, onUnmounted, ref, watch} from "vue";

import BackgroundItemsComponent from "@/components/background-items-component.vue";
import ScoreComponent from "@/components/score-component.vue";
import FloorComponent from "@/components/floor-component.vue";
import SleepSymbols from "@/components/sleep-symbols.vue";

const fox = {
  position: ref(0),
  lookingLeft: ref(false),
  width: 150,
  isAwake: ref(true)
}

const house = {
  position: window.innerWidth - 340,
  sleepSymbolsVisible: ref(false)
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
const toggleFoxSleep = () => {
  if(fox.position.value + fox.width >= house.position) {
    fox.isAwake.value = !fox.isAwake.value;
    house.sleepSymbolsVisible.value = !house.sleepSymbolsVisible.value;
  }
};


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
      <img
          v-if="fox.isAwake.value"
          class="fox" src="/fox.png"
          alt="game-character"
          :style="{ left: `${fox.position.value}px`, transform: fox.lookingLeft.value ? 'scaleX(-1)' : 'scaleX(1)' }">

      <img @click="toggleFoxSleep" src="/house/house-for-fox.png" alt="house" class="house">
      <sleep-symbols v-if="house.sleepSymbolsVisible.value"></sleep-symbols>
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

.house {
  position: absolute;
  width: 300px;
  bottom: 20px;
  right: 30px;
  z-index: 2;
}

.house:hover {
  cursor: pointer;
}
</style>
