<template>
  <h1>
    <span class="primary">For</span> Project
    <span class="primary">Of</span> Projects
  </h1>
  <SpinLoader v-if="loading" />
  <h2 v-else-if="error">An Error Occurred</h2>
  <div v-else class="split">
    <ProjectCard
      v-for="(project, index) in [...projects].reverse()"
      :key="index"
      :project="project"
    />
  </div>
</template>

<script>
import ProjectCard from "@/components/ProjectCard.vue";
import SpinLoader from "@/components/SpinLoader.vue";
export default {
  name: "ProjectsView",
  components: {
    ProjectCard,
    SpinLoader,
  },
  data() {
    return {
      loading: true,
      error: false,
      projects: [
        {
          name: "",
          date: "",
          readTime: "",
          tags: [],
          description: "",
        },
      ],
    };
  },
  async mounted() {
    const response = await fetch(
      `${process.env.VUE_APP_SUPABASE_URL}/storage/v1/object/public/storage/data/projectStorage.json`
    );
    if (!response.ok) {
      console.log(`An error has occurred: ${response.status}`);
      this.loading = false;
      this.error = true;
      return;
    }
    const data = await response.json();
    this.projects = data.projects;
    this.loading = false;
  },
};
</script>
