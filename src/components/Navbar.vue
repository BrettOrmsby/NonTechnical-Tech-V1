<template>
  <nav class="navbar" id="navbar">
    <router-link to="/" style="text-decoration: none; color: inherit">
      <span class="monospace"
        ><strong><span class="primary">Non</span>Technical Tech</strong></span
      ></router-link
    >
    <div class="button-container">
      <router-link to="/search"
        ><button style="padding: 0.5rem">
          <vue-feather
            type="search"
            stroke="var(--color)"
            size="1rem"
          /></button
      ></router-link>
      <router-link to="/articles"
        ><button style="padding: 0.5rem">
          <vue-feather type="book" stroke="var(--color)" size="1rem" /></button
      ></router-link>
      <router-link to="/projects"
        ><button style="padding: 0.5rem">
          <vue-feather type="code" stroke="var(--color)" size="1rem" /></button
      ></router-link>
      <a href="https://github.com/BrettOrmsby/blog"
        ><button class="secondary" style="padding: 0.5rem">
          <vue-feather
            type="github"
            stroke="var(--color)"
            size="1rem"
          /></button
      ></a>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  created() {
    let prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
      let currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.position = "fixed";
      } else {
        document.getElementById("navbar").style.position = "absolute";
      }
      prevScrollpos = currentScrollPos;
    };
  },
};
</script>

<style scoped>
.button-container {
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
button {
  margin-left: 1em;
  display: flex;
  align-items: center;
}
</style>
