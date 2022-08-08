<template>
  <h1>
    <span class="primary">For</span> Project
    <span class="primary">Of</span> Projects
  </h1>
  <SpinLoader v-if="loading" />
  <h2 v-else-if="error">There Was An Error</h2>
  <div v-else class="split" style="margin: 0">
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
    let data = await this.$supabase.storage
      .from("articles")
      .download("projectStorage.json");
    if (data.error !== null) {
      console.log(data.error);
      this.loading = false;
      this.error = true;
      return;
    }
    let projects = JSON.parse(await data.data.text()).projects;
    this.projects = projects;
    this.loading = false;
  },
};
</script>

<style scoped>
.card {
  margin-top: 0px;
}
</style>
