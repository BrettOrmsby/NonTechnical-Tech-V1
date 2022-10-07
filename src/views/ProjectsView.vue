<script>
export default {
  name: "ProjectsView",
};
</script>

<script setup>
import ProjectCard from "@/components/ProjectCard.vue";
import SpinLoader from "@/components/SpinLoader.vue";
import { useFetch } from "@/composables/fetch.js";

const { data, loading, error } = useFetch(
  `${process.env.VUE_APP_SUPABASE_URL}/storage/v1/object/public/storage/data/projectStorage.json`,
  "json"
);
</script>
<template>
  <h1>
    <span class="primary">For</span> Project
    <span class="primary">Of</span> Projects
  </h1>
  <SpinLoader v-if="loading" />
  <h2 v-else-if="error">An Error Occurred</h2>
  <div v-else class="card-grid">
    <ProjectCard
      v-for="(project, index) in [...data.projects].reverse()"
      :key="index"
      :project="project"
    />
  </div>
</template>
