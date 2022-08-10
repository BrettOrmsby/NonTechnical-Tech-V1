<template>
  <h1>Search</h1>
  <div class="card">
    <div class="split" style="margin-bottom: 0; align-items: center">
      <input type="text" v-model="query.title" placeholder="Search Title" />
      <div>
        <b>Show</b>
        <label class="flex" for="all"
          ><input
            id="all"
            type="radio"
            name="type"
            value="all"
            v-model="query.type"
          />All</label
        >
        <label class="flex" for="article"
          ><input
            id="article"
            type="radio"
            name="type"
            value="article"
            v-model="query.type"
          />Articles</label
        >
        <label class="flex" for="project"
          ><input
            id="project"
            type="radio"
            name="type"
            value="project"
            v-model="query.type"
          />Projects</label
        >
      </div>
    </div>
    <template v-for="(tag, index) in allTags" :key="index">
      <span
        class="tag noHover"
        :class="{ click: queryTags.includes(tag) }"
        @click="tagClick"
        >{{ tag }}</span
      >
    </template>
  </div>
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
      queryTags: [],
      loadingArticle: true,
      loadingProject: true,
      error: false,
      articles: [],
      projects: [],
      query: {
        tag: "",
        title: "",
        type: "all",
      },
    };
  },
  computed: {
    loading() {
      return this.loadingArticle && this.loadingProject;
    },
    allTags() {
      let output = [];
      for (let item of [...this.articles, ...this.projects]) {
        output = [...new Set([...output, ...item.tags])];
      }
      return output.sort((a, b) => a.localeCompare(b));
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
        for (let tag of this.query.tag.split(",").filter((e) => e)) {
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
      tag: tag?.split(",") || "",
      title: title || "",
      type: type || "all",
    };
    this.queryTags = tag?.split(",") || [];
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
  methods: {
    tagClick(event) {
      let element = event.target;
      if (this.queryTags.includes(element.innerText)) {
        this.queryTags = this.queryTags.filter(
          (item) => item !== element.innerText
        );
      } else {
        this.queryTags = [...this.queryTags, element.innerText];
      }
    },
  },
  watch: {
    query: {
      handler(newer) {
        this.$router.replace({ name: "search", query: newer });
      },
      deep: true,
    },
    queryTags(newer) {
      this.query.tag =
        newer.filter((e) => e).length === 0
          ? ""
          : newer.filter((e) => e).join(",");
    },
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
}
label {
  cursor: pointer;
}
input[type="text"] {
  cursor: pointer;
  width: 50%;
  border-radius: 0.5rem;
  padding: 0.5rem;
  border: 0.1rem solid var(--border);
  background-color: var(--bg);
  color: var(--color);
  font-family: inherit;
  font-size: inherit;
  display: block;
  margin: 0 auto;
}
input[type="text"]:focus {
  border-color: var(--primary);
  outline: none;
}
.flex {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0;
}
input[type="radio"] {
  cursor: pointer;
  appearance: none;
  background-color: transparent;
  background-clip: content-box;
  padding: 0.1rem;
  margin: 0;
  margin-right: 0.25rem;
  width: 0.75rem;
  height: 0.75rem;
  border: 0.1rem solid var(--primary);
  border-radius: 50%;
}
input[type="radio"]:checked {
  background-color: var(--primary);
}
.noHover {
  color: var(--primary);
  background-color: transparent;
}
.click {
  color: var(--bg);
  background-color: var(--primary);
}
</style>
