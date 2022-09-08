<script>
export default {
  name: "HomeView",
};
</script>
<script setup>
import SpinLoader from "@/components/SpinLoader.vue";
import ArticleCard from "@/components/ArticleCard.vue";
import ProjectCard from "@/components/ProjectCard.vue";
import { computed } from "vue";
import { useFetch } from "@/compostables/fetch.js";
const {
  data: articleData,
  loading: loadingArticle,
  error: errorArticle,
} = useFetch(
  `${process.env.VUE_APP_SUPABASE_URL}/storage/v1/object/public/storage/data/blogStorage.json`,
  "json"
);
const {
  data: projectData,
  loading: loadingProject,
  error: errorProject,
} = useFetch(
  `${process.env.VUE_APP_SUPABASE_URL}/storage/v1/object/public/storage/data/projectStorage.json`,
  "json"
);
const latestArticle = computed(() =>
  articleData.value.articles
    ? articleData.value.articles[articleData.value.articles.length - 1]
    : {}
);
const latestProject = computed(() =>
  projectData.value.projects
    ? projectData.value.projects[projectData.value.projects.length - 1]
    : {}
);
</script>

<template>
  <h1>
    <span class="monospace"
      ><strong><span class="primary">Non</span>Technical Tech</strong></span
    >
  </h1>
  <div class="card" style="text-align: center">
    <p class="content">
      Hi, I'm Brett Ormsby and I write this non-technical blog for fun! My
      current Interests are Scriptable, Vue.js and JavaScript.
    </p>
  </div>

  <div class="split">
    <div>
      <h2><span class="primary">new</span> Article()</h2>
      <SpinLoader v-if="loadingArticle" />
      <h3 v-else-if="errorArticle">An Error Occurred</h3>
      <ArticleCard v-else :article="latestArticle" />
      <router-link to="articles"><button>View All</button></router-link>
    </div>
    <div>
      <h2><span class="primary">new</span> Project()</h2>
      <SpinLoader v-if="loadingProject" />
      <h3 v-else-if="errorProject">An Error Occurred</h3>
      <ProjectCard v-else :project="latestProject" />
      <router-link to="projects"><button>View All</button></router-link>
    </div>
  </div>
</template>
