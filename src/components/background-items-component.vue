<script setup>

</script>

<template>
  <img src="/background/cloud1.png" alt="cloud" class="cloud1">
  <img src="/background/cloud2.png" alt="cloud" class="cloud2">
  <img src="/background/cloud3.png" alt="cloud" class="cloud3">
</template>

<style scoped>
img {
  left: -300px;
  position: absolute;
  width: 150px;
}
.cloud1 {
  animation: cloud 15s linear forwards infinite;
  top: 200px;
}
.cloud2 {
  animation: cloud 20s linear forwards infinite;
  animation-delay: 9s;
  top: 400px;
}
.cloud3 {
  animation: cloud 18s linear forwards infinite;
  animation-delay: 20s;
  top: 500px;
}
@keyframes cloud {
  0% {
    left: 0;
    opacity: 1;
  }
  90% {
    opacity: 1;

  }
  100% {
    left: calc(100% - 150px);
    opacity: 0;
  }
}
</style>
