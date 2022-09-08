<script setup>
import NavBar from "@/components/NavBar.vue";
import NavFooter from "@/components/NavFooter.vue";
</script>

<template>
  <NavBar />
  <div class="container">
    <router-view />
  </div>
  <NavFooter />
</template>

<style>
@import "@/assets/styles/style.css";
</style>
