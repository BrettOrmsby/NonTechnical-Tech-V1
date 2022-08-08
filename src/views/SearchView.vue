<template>
  <SpinLoader />
</template>

<script>
// query shjould be the router or default . search button will update the wuery
import SpinLoader from "@/components/SpinLoader.vue";
import ArticleCard from "@/components/ArticleCard.vue";
import ProjectCard from "@/components/ProjectCard.vue";
export default {
  name: "SearchView",
  components: {
    SpinLoader,
    ArticleCard,
    ProjectCard,
  },
  data() {
    return {
      loadingArticle: true,
      loadingProject: true,
      error: false,
      articles: [],
      projects: [],
      query: {
        tag: [],
        title: "",
        type: null,
      },
    };
  },
  computed: {
    loading() {
      return this.loadingArticle && this.loadingProject;
    },
  },
  mounted() {
    let queryParams = this.$route.query;
    console.log(queryParams);
    let { title, tag, type } = queryParams;
    let query = {
      tag: tag.split(",") || [],
      title: title || "",
      type: type || null,
    };
    console.log(query);
    this.query = query;
    loadArticle.bind(this)();
    loadProject.bind(this)();
    async function loadArticle() {
      let articleData = await this.$supabase.storage
        .from("articles")
        .download("blogStorage.json");
      if (articleData.error !== null) {
        console.log(articleData.error);
        this.loadingArticle = false;
        this.error = true;
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
        this.error = true;
      } else {
        let projects = JSON.parse(await projectData.data.text()).projects;
        this.projects = projects;
        this.loadingProject = false;
      }
    }
  },
};
</script>
