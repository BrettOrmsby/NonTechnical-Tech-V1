<template>
  <NavBar />
  <div class="container">
    <router-view />
  </div>
  <NavFooter />
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import NavFooter from "@/components/NavFooter.vue";
export default {
  components: {
    NavBar,
    NavFooter,
  },
};
</script>

<style>
@import "@/assets/styles/style.css";
</style>
