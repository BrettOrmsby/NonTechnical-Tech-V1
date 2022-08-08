<template>
  <div class="card">
    <h3 style="margin-bottom: 0.2em; margin-top: 0">{{ project.name }}</h3>
    <div style="margin: 0">
      <span
        v-for="(tag, index) in [...project.tags].sort((a, b) =>
          a.localeCompare(b)
        )"
        :key="index"
        class="tag"
        style="margin-bottom: 0"
        >{{ tag }}</span
      >
    </div>
    <img :src="project.image" />
    <p>
      {{ project.description }}
      <br />
      <a :href="project.link">Visit</a>
    </p>
  </div>
</template>

<script>
export default {
  name: "ProjectCard",
  props: ["project"],
};
</script>

<style>
img {
  display: block;
  margin: 0 auto;
  height: auto;
  width: auto;
  object-fit: cover;
  width: 100%;
  max-height: 15rem;
  margin-top: 1rem;
}
</style>
