<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";

import { scoreService } from "./service/score";
import { fallingItemsService } from "./service/fallingItems";

import BackgroundItemsComponent from "@/components/background-items-component.vue";
import ScoreComponent from "@/components/score-component.vue";
import FloorComponent from "@/components/grass-component.vue";
import SleepSymbols from "@/components/sleep-symbols.vue";

const score = ref(0);
const fallingItems = ref([]);
const fallSpeed = 1.7;
let generationInterval = null;
const isTabFocused = ref(true);

const fox = {
  position: ref(0),
  targetPosition: ref(0),
  lookingLeft: ref(false),
  width: 160,
  isAwake: ref(true),
  speed: 20,
};

const house = {
  position: window.innerWidth - 340,
  sleepSymbolsVisible: ref(false),
  sleepDialogVisible: false,
};

const handleKeyPress = (event) => {
  if (event.code === "ArrowLeft") {
    if (fox.targetPosition.value > 0) {
      fox.targetPosition.value -= fox.speed;
      fox.lookingLeft.value = true;
    }
  } else if (event.code === "ArrowRight") {
    if (fox.targetPosition.value + fox.width < window.innerWidth - 50) {
      fox.targetPosition.value += fox.speed;
      fox.lookingLeft.value = false;
    }
  }
};

const updateFoxPosition = () => {
  const offset = 0.1;
  fox.position.value +=
      (fox.targetPosition.value - fox.position.value) * offset;

  if (fox.position.value + fox.width >= house.position && fox.isAwake.value) {
    house.sleepDialogVisible = true;
  } else {
    house.sleepDialogVisible = false;
  }

  requestAnimationFrame(updateFoxPosition);
};

const toggleFoxSleep = () => {
  if (fox.position.value + fox.width >= house.position) {
    fox.isAwake.value = !fox.isAwake.value;
    house.sleepSymbolsVisible.value = !house.sleepSymbolsVisible.value;
  }
};

const checkCollision = (item) => {
  const foxLeft = fox.position.value;
  const foxRight = fox.position.value + fox.width;
  const itemLeft = item.positionX;
  const itemRight = item.positionX + 45;
  const itemBottom = item.positionY + 45;
  if (
      itemBottom >= window.innerHeight - 130 &&
      itemLeft >= foxLeft &&
      itemRight <= foxRight
  ) {
    score.value++;
    fallingItems.value.splice(fallingItems.value.indexOf(item), 1);
  }
};

const updateFallingItems = () => {
  fallingItems.value.forEach((item) => {
    item.positionY += fallSpeed;
    checkCollision(item);
    fallingItemsService.removeItem(fallingItems.value, item);
  });
  requestAnimationFrame(updateFallingItems);
};

const startItemGeneration = () => {
  if (generationInterval === null) {
    generationInterval = setInterval(
        () => fallingItemsService.generateFallingItems(fallingItems.value),
        1000
    );
  }
};

const stopItemGeneration = () => {
  if (generationInterval !== null) {
    clearInterval(generationInterval);
    generationInterval = null;
  }
};

const handleTabVisibilityChange = () => {
  if (document.hidden) {
    isTabFocused.value = false;
    stopItemGeneration();
  } else {
    isTabFocused.value = true;
    startItemGeneration();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeyPress);
  score.value = scoreService.loadScore();

  if (isTabFocused.value) {
    startItemGeneration();
  }

  requestAnimationFrame(updateFallingItems);
  requestAnimationFrame(updateFoxPosition);

  document.addEventListener("visibilitychange", handleTabVisibilityChange);
});

watch(score, () => {
  scoreService.saveScore(score.value);
});
</script>

<template>
  <div class="background">
    <background-items-component></background-items-component>
    <score-component :score="score"></score-component>
    <div class="main">
      <div
          class="items-container"
          v-for="(item, index) in fallingItems"
          :key="item"
      >
        <img
            v-if="!item.caught"
            :key="index"
            class="item"
            :src="item.image"
            :style="{
left: `${item.positionX}px`,
top: `${item.positionY}px`,
}"
            alt="falling object"
        />
      </div>
      <img
          v-if="fox.isAwake.value"
          class="fox"
          src="/fox.png"
          alt="game-character"
          :style="{
left: `${fox.position.value}px`,
transform: fox.lookingLeft.value
? 'scaleX(-1)'
: 'scaleX(1)',
}"
      />

      <div @click="toggleFoxSleep" class="house">
        <div v-if="house.sleepDialogVisible" class="dialog-box">
          <p>Click to get rest!</p>
        </div>

        <img src="/house/house-for-fox.png" alt="house" />
      </div>
      <sleep-symbols
          v-if="house.sleepSymbolsVisible.value"
      ></sleep-symbols>
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
  z-index: 3;
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

.dialog-box {
  position: absolute;
  bottom: 150px;
  right: 30px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px;
  border-radius: 5px;
  z-index: 10;
  font-size: 18px;
}

.item {
  position: absolute;
  width: 45px;
}
</style>