<script>
export default { name: "ProjectCard" };
</script>
<script setup>
import TagList from "@/components/TagList.vue";
defineProps(["project"]);
</script>

<template>
  <div class="card">
    <a :href="project.link"><img :src="project.image" /></a>
    <div class="content">
      <a :href="project.link"
        ><h3>{{ project.name }}</h3></a
      >
      <div>
        <TagList :tags="project.tags" />
      </div>
      <p>
        {{ project.description }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.card {
  max-width: 450px;
}
</style>
