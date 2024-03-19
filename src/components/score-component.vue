<script setup>
defineProps({
  score: Number
})
</script>

<template>
<div class="score-container">
  <span>Score:{{score}}</span>
  <img src="/decor/moon.png"
       alt="moon">
</div>
</template>

<style scoped>
.score-container {
  position: absolute;
  top: 50px;
  right: 50px;
  display: flex;
  align-items: center;
  z-index: 2;
}
span {
  font-size: 30px;
  color: yellow;
  margin-top: 10px;
}
img {
  width: 90px
}
</style>
