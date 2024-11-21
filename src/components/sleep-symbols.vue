<script setup>

</script>

<template>
  <div class="symbols-container">
    <p>z</p>
    <p>z</p>
    <p>z</p>
  </div>

</template>

<style scoped>
.symbols-container{
  width: 80px;
  position: absolute;
  display: flex;
  flex-direction: column;
  bottom: 330px;
  right: 10px;
  font-size: 30px;
  animation: swing 4s infinite;
}
.symbols-container p:nth-child(1) {
  align-self: flex-end;
}
.symbols-container p:nth-child(2) {
  align-self: center;
}

.symbols-container p:nth-child(3) {
  align-self: flex-start;
}
@keyframes swing {
  0% { transform: translateY(0); }
  50% { transform: translateY(6px); }
  100% { transform: translateY(0); }
}

</style>
