<script>
export default {
  name: "NavFooter",
};
</script>

<template>
  <footer class="footer">
    <div class="footerLinks">
      <router-link to="/">Home</router-link>
      <router-link to="/search">Search</router-link>
      <router-link to="/articles">Articles</router-link>
      <router-link to="/projects">Projects</router-link>
      <a href="https://github.com/BrettOrmsby/blog">Source</a>
    </div>
    <small><span class="primary">Non</span>Technical Tech 2022 ©</small>
  </footer>
</template>

<style scoped>
.footer {
  background-color: var(--layer);
  padding: 1rem;
  width: 100%;
  border-top: 0.05rem solid var(--border);
}
.footerLinks {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: var(--margin);
}
small {
  display: block;
  text-align: center;
  margin: 0;
}
</style>
