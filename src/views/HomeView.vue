<template>
  <h1>
    <span class="monospace"
      ><strong><span class="primary">Non</span>Technical Tech</strong></span
    >
  </h1>
  <p class="card" style="text-align: center">
    Hi, I'm Brett Ormsby and I write this non-technical blog for fun! My current
    Interests are Scriptable, Vue.js and JavaScript.
  </p>

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
      let articleData = await this.$supabase.storage
        .from("articles")
        .download("blogStorage.json");
      if (articleData.error !== null) {
        console.log(articleData.error);
        this.loadingArticle = false;
        this.errorArticle = true;
      } else {
        let articles = JSON.parse(await articleData.data.text()).articles;
        this.articles = articles;
        this.loadingArticle = false;
      }
    }
    async function loadProject() {
      let projectData = await this.$supabase.storage
        .from("articles")
        .download("projectStorage.json");
      if (projectData.error !== null) {
        console.log(projectData.error);
        this.loadingProject = false;
        this.errorProject = true;
      } else {
        let projects = JSON.parse(await projectData.data.text()).projects;
        this.projects = projects;
        this.loadingProject = false;
      }
    }
  },
};
</script>
