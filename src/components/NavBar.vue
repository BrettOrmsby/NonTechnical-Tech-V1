<script>
export default {
  name: "NavBar",
};
</script>

<script setup>
import VueFeather from "vue-feather";
import { onMounted } from "vue";

// Appear nav on scroll up
onMounted(() => {
  let prevScrollPos = window.pageYOffset;
  window.onscroll = function () {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollPos > currentScrollPos) {
      document.getElementById("navbar").style.position = "fixed";
    } else {
      document.getElementById("navbar").style.position = "absolute";
    }
    prevScrollPos = currentScrollPos;
  };
});
</script>

<template>
  <nav class="navbar" id="navbar">
    <router-link to="/" style="text-decoration: none; color: inherit">
      <span class="monospace"
        ><strong><span class="primary">Non</span>Technical Tech</strong></span
      ></router-link
    >
    <div class="button-container">
      <router-link to="/search"
        ><button>
          <vue-feather type="search" stroke="var(--bg)" size="1rem" /></button
      ></router-link>
      <router-link to="/articles"
        ><button>
          <vue-feather type="book" stroke="var(--bg)" size="1rem" /></button
      ></router-link>
      <router-link to="/projects"
        ><button>
          <vue-feather type="code" stroke="var(--bg)" size="1rem" /></button
      ></router-link>
      <a href="https://github.com/BrettOrmsby/blog"
        ><button class="secondary">
          <vue-feather type="github" stroke="var(--bg)" size="1rem" /></button
      ></a>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  padding: 0.5rem;
  background-color: var(--layer);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.05rem solid var(--border);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
}
.button-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
button {
  margin: 0;
  margin-left: 1em;
  display: flex;
  align-items: center;
  padding: 0.5rem;
}
</style>
