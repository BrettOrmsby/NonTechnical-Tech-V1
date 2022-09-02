<template>
  <div class="card">
    <h3>{{ project.name }}</h3>
    <div>
      <TagList :tags="project.tags" />
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
import TagList from "@/components/TagList.vue";
export default {
  components: { TagList },
  name: "ProjectCard",
  props: ["project"],
};
</script>

<style scoped>
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
