<template>
  <nav class="navbar" id="navbar">
    <router-link to="/" style="text-decoration: none; color: inherit">
      <span class="monospace"
        ><strong><span class="primary">Non</span>Technical Tech</strong></span
      ></router-link
    >
    <div class="button-container">
      <router-link to="/articles"
        ><button style="padding: 0.5rem">
          <vue-feather type="book" stroke="var(--color)" size="1rem" /></button
      ></router-link>
      <button style="padding: 0.5rem">
        <vue-feather type="code" stroke="var(--color)" size="1rem" />
      </button>
      <button class="secondary" style="padding: 0.5rem">
        <vue-feather type="github" stroke="var(--color)" size="1rem" />
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style>
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
