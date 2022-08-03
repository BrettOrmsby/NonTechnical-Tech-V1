<template>
  <NavBar />
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view />
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
