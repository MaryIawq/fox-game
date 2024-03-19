<script setup>

import SleepButton from "@/components/house-components/sleep-button.vue";
import SleepSymbols from "@/components/house-components/sleep-symbols.vue";
</script>

<template>
<img src="/house/house-for-fox.png" alt="house" class="house">
  <sleep-button></sleep-button>
  <sleep-symbols></sleep-symbols>
</template>

<style scoped>
.house {
  position: absolute;
  width: 300px;
  bottom: 20px;
  right: 30px;
  z-index: 2;
}
</style>
