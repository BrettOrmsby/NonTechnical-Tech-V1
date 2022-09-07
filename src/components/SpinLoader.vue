<script>
export default {
  name: "SpinLoader",
};
</script>

<script setup>
import VueFeather from "vue-feather";
</script>

<template>
  <div>
    <VueFeather
      size="2rem"
      type="loader"
      animation="spin"
      stroke="var(--primary)"
    />
  </div>
</template>

<style scoped>
div {
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
