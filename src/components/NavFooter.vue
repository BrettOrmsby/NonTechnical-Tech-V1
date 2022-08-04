<template>
  <footer class="footer">
    <div class="footerLinks">
      <router-link to="/">Home</router-link>
      <router-link to="/articles">Articles</router-link>
      <a href="">Projects</a>
      <a href="">Source</a>
    </div>
    <small style="display: block; text-align: center"
      ><span class="primary">Non</span>Technical Tech 2022 ©</small
    >
  </footer>
</template>

<script>
export default {
  name: "NavFooter",
};
</script>
