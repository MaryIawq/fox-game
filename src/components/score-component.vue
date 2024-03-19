<script setup>

</script>

<template>
<div class="score-container">
  <span>Score:16</span>
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
