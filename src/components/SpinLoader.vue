<template>
  <div>
    <vue-feather
      size="2rem"
      type="loader"
      animation="spin"
      stroke="var(--primary)"
    />
  </div>
</template>

<script>
export default {
  name: "SpinLoader",
};
</script>

<style scoped>
div {
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
