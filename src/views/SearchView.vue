<template>
  <h1>Search</h1>
  <input type="text" v-model="query.title" />
  <SpinLoader v-if="loading" />
  <h2 v-else-if="error">There Was An Error</h2>
  <h2 v-else-if="filter.length === 0">No Items Were Found</h2>
  <div v-else class="split">
    <template v-for="(item, index) in filter" :key="index">
      <ArticleCard v-if="item.date" :article="item" />
      <ProjectCard v-else :project="item" />
    </template>
  </div>
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
        type: "all",
      },
    };
  },
  computed: {
    loading() {
      return this.loadingArticle && this.loadingProject;
    },
    filter() {
      return [...this.articles, ...this.projects].filter((e) => {
        if (!e.name.toLowerCase().includes(this.query.title.toLowerCase())) {
          return false;
        }
        if (this.query.type === "article" && !e.date) {
          return false;
        }
        if (this.query.type === "project" && !e.link) {
          return false;
        }
        for (let tag of this.query.tag) {
          if (!e.tags.includes(tag)) {
            return false;
          }
        }
        return true;
      });
    },
  },
  mounted() {
    let queryParams = this.$route.query;
    let { title, tag, type } = queryParams;
    let query = {
      tag: tag?.split(",") || [],
      title: title || "",
      type: type || "all",
    };
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
  watch: {
    query: {
      handler(newer, older) {
        this.$router.replace({ name: "search", query: newer });
      },
      deep: true,
    },
  },
};
</script>
