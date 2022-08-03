<template>
  <nav class="navbar" id="navbar">
    <span class="monospace"
      ><strong><span class="primary">Non</span>technical Tech</strong></span
    >
    <div class="button-container">
      <button style="padding: 0.5rem">
        <vue-feather type="book" stroke="var(--color)" size="1rem" />
      </button>
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
