<template>
  <Navbar/>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view />
  <Footer/>
</template>

<script>
import NavBar from "@/components/Navbar.vue"
import Footer from "@/components/Footer.vue"
import Navbar from "@/components/Navbar.vue"
export default {
  components: {
    NavBar,
    Footer,
    Navbar
}
}
</script>

<style>
  @import './assets/styles/style.css';
</style>
