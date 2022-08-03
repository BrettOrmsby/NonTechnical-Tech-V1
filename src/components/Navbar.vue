<template>
  <nav class="navbar" id="navbar">
    <span class="monospace"
      ><strong><span class="primary">Non</span>technical Tech</strong></span
    >
    <div style="margin: 0; padding: 0">
      <button style="padding: 0.5em">
        <i
          data-feather="book"
          style="width: 1em; height: 1em; display: block"
        ></i>
      </button>
      <button style="padding: 0.5em">
        <i
          data-feather="code"
          style="display: block; width: 1em; height: 1em"
        ></i>
      </button>
      <button class="secondary" style="padding: 0.5em">
        <i
          data-feather="github"
          style="width: 1em; height: 1em; display: block"
        ></i>
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  /*mounted() {
    feather.replace();
  },*/
  name: "NavBar",
};
</script>
