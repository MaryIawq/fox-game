<script setup>
import {ref} from "vue";

import BackgroundItemsComponent from "@/components/background-items-component.vue";
import ScoreComponent from "@/components/score-component.vue";
import HouseComponent from "@/components/house-components/house-component.vue";
import FloorComponent from "@/components/floor-component.vue";

const score = ref(0)
</script>

<template>
  <div class="background">
    <background-items-component></background-items-component>
    <score-component></score-component>
    <div class="main">
      <div class="items-container">
        <img class="item" src="">
      </div>
      <img class="fox" src="/fox.png" alt="game-character">
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
