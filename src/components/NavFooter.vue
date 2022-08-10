<template>
  <footer class="footer">
    <div class="footerLinks">
      <router-link to="/">Home</router-link>
      <router-link to="/search">Search</router-link>
      <router-link to="/articles">Articles</router-link>
      <router-link to="/projects">Projects</router-link>
      <a href="https://github.com/BrettOrmsby/blog">Source</a>
    </div>
    <small style="display: block; text-align: center; margin: 0"
      ><span class="primary">Non</span>Technical Tech 2022 ©</small
    >
  </footer>
</template>

<script>
export default {
  name: "NavFooter",
};
</script>
