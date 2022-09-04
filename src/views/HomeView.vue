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
      <h3 v-else-if="errorArticle">There Was An Error</h3>
      <ArticleCard v-else :article="latestArticle" />
      <router-link to="articles"><button>View All</button></router-link>
    </div>
    <div>
      <h2><span class="primary">new</span> Project()</h2>
      <SpinLoader v-if="loadingProject" />
      <h3 v-else-if="errorProject">There Was An Error</h3>
      <ProjectCard v-else :project="latestProject" />
      <router-link to="projects"><button>View All</button></router-link>
    </div>
  </div>
</template>

<script>
import SpinLoader from "@/components/SpinLoader.vue";
import ArticleCard from "@/components/ArticleCard.vue";
import ProjectCard from "@/components/ProjectCard.vue";
export default {
  name: "HomeView",
  components: {
    SpinLoader,
    ArticleCard,
    ProjectCard,
  },
  data() {
    return {
      loadingArticle: true,
      errorArticle: false,
      articles: [
        {
          name: "",
          date: "",
          readTime: "",
          tags: [],
          description: "",
          image: "",
        },
      ],
      loadingProject: true,
      errorProject: false,
      projects: [
        {
          name: "",
          image: "",
          link: "",
          tags: [],
          description: "",
        },
      ],
    };
  },
  computed: {
    latestArticle() {
      return this.articles[this.articles.length - 1];
    },
    latestProject() {
      return this.projects[this.projects.length - 1];
    },
  },
  mounted() {
    loadArticle.bind(this)();
    loadProject.bind(this)();
    async function loadArticle() {
      const response = await fetch(
        `${process.env.VUE_APP_SUPABASE_URL}/storage/v1/object/public/storage/data/blogStorage.json`
      );
      if (!response.ok) {
        console.log(`An error has occured: ${response.status}`);
        this.loadingArticle = false;
        this.errorArticle = true;
        return;
      }
      const data = await response.json();
      this.articles = data.articles;
      this.loadingArticle = false;
    }
    async function loadProject() {
      const response = await fetch(
        `${process.env.VUE_APP_SUPABASE_URL}/storage/v1/object/public/storage/data/projectStorage.json`
      );
      if (!response.ok) {
        console.log(`An error has occured: ${response.status}`);
        this.loadingProject = false;
        this.errorProject = true;
        return;
      }
      const data = await response.json();
      this.projects = data.projects;
      this.loadingProject = false;
    }
  },
};
</script>
