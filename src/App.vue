<script setup>
import {onMounted, onUnmounted, ref, watch} from "vue";

import BackgroundItemsComponent from "@/components/background-items-component.vue";
import ScoreComponent from "@/components/score-component.vue";
import FloorComponent from "@/components/grass-component.vue";
import SleepSymbols from "@/components/sleep-symbols.vue";

const fox = {
  position: ref(0),
  lookingLeft: ref(false),
  width: 160,
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

const score = ref(0)
const fallingItems = ref([]);
const fallSpeed = 15

const checkCollision = (item) => {
  const foxLeft = fox.position.value;
  const foxRight = fox.position.value + fox.width;
  const itemLeft = item.positionX
  const itemRight = item.positionX + 45
  const itemBottom = item.positionY + 45;
  if (itemBottom >= window.innerHeight - 130 && itemLeft >= foxLeft && itemRight <= foxRight ){
    score.value++
    fallingItems.value.splice(fallingItems.value.indexOf(item), 1)
  }
}
const removeItem = (item) => {
  const grassBlockHeight = 55;
  if (item.positionY + 45 >=  window.innerHeight - grassBlockHeight) {
    fallingItems.value.splice(fallingItems.value.indexOf(item), 1);
  }
}
setInterval(() => {
  fallingItems.value.forEach(item => {
    item.positionY += fallSpeed;
    checkCollision(item);
    removeItem(item);
  });
}, 100);

onMounted(() =>
    { window.addEventListener('keydown', handleKeyPress)
      loadScoreFromLocalStorage()
      setInterval(() => {
        const itemsImages = [
          "cheese.png",
          "donuts.png",
          "diamond.png",
          "banana.png",
          "burger.png",
          "popcorn.png"
        ];
        const randomItem = itemsImages[Math.floor(Math.random() * itemsImages.length)];
        const itemsContainer = window.innerWidth - 110;
        const randomX = Math.random() * itemsContainer
        fallingItems.value.push({
          positionX: randomX,
          positionY: -50,
          image: `items/${randomItem}`,
          caught: false
        });
      }, 1000);
    }
)
const saveScoreToLocalStorage = () => {
  localStorage.setItem('FoxGameScore:', score.value);
};
watch(score, () => {
  saveScoreToLocalStorage();
});
const loadScoreFromLocalStorage = () => {
  const savedScore = localStorage.getItem('FoxGameScore:');
  if (savedScore !== null) {
    score.value = parseInt(savedScore, 10);
  }
};

</script>

<template>
  <div class="background">
    <background-items-component></background-items-component>
    <score-component :score="score"></score-component>
    <div class="main">
      <div class="items-container" v-for="(item, index) in fallingItems">
        <img v-if="!item.caught" :key="index" class="item" :src="item.image"
             :style="{ left: `${item.positionX}px`, top: `${item.positionY}px`}" alt="falling object">
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
  bottom: 35px;
  width: 150px;
  z-index: 3
}

.item {
  width: 25px;
  position: absolute;
  z-index: 4;
}

.house {
  position: absolute;
  width: 300px;
  bottom: 30px;
  right: 30px;
  z-index: 2;
}

.house:hover {
  cursor: pointer;
}
.item {
  position: absolute;
  width: 45px;
}
</style>
