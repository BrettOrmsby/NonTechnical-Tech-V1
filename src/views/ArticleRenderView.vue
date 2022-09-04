<template>
  <template v-if="loading">
    <div class="spacer"></div>
    <SpinLoader />
  </template>
  <h1 v-else-if="error">An Error Occurred</h1>
  <template v-else>
    <h1>{{ article.name }}</h1>
    <div class="card" style="max-width: 700px; margin: 0 auto">
      <div class="content">
        <span
          v-for="(tag, index) in [...article.tags].sort((a, b) =>
            a.localeCompare(b)
          )"
          :key="index"
          class="tag"
          style="margin-bottom: 0"
          >{{ tag }}</span
        >
        <p>
          <small>
            {{ article.date }} <span class="primary">•</span>
            {{ article.readTime }}min read</small
          >
          <br />
          {{ article.description }}
        </p>
      </div>
    </div>
    <div v-html="md2html" class="md"></div>
  </template>
</template>

<script>
import { marked } from "marked";
import hljs from "highlight.js";
import SpinLoader from "@/components/SpinLoader.vue";
export default {
  name: "ArticleRenderView",
  components: {
    SpinLoader,
  },
  data() {
    return {
      loading: true,
      error: false,
      markdown: "",
      article: {
        name: "",
        date: "",
        readTime: "",
        tags: [],
        description: "",
      },
      id: parseInt(this.$route.params.id),
    };
  },
  computed: {
    md2html() {
      marked.setOptions({
        renderer: new marked.Renderer(),
        highlight: function (code, lang) {
          const language = hljs.getLanguage(lang) ? lang : "plaintext";
          return hljs.highlight(code, { language }).value;
        },
        langPrefix: "hljs language-",
        baseUrl: `${process.env.VUE_APP_SUPABASE_URL}/storage/v1/object/public/storage/articles/${this.article.path}/`,
        headerPrefix: "",
      });
      return marked.parse(this.markdown);
    },
  },
  async mounted() {
    let id = this.id;
    const response = await fetch(
      `${process.env.VUE_APP_SUPABASE_URL}/storage/v1/object/public/storage/data/blogStorage.json`
    );
    if (!response.ok) {
      console.log(`An error has occurred: ${response.status}`);
      this.loading = false;
      this.error = true;
      return;
    }
    const data = await response.json();
    let articles = data.articles;
    let currentArticle = articles.filter((e) => e.id === id)[0];
    if (currentArticle) {
      this.article = currentArticle;
      document.title = currentArticle.name + " | NonTechnical Tech";
    } else {
      window.location = "/404";
      return;
    }
    const markdownResponse = await fetch(
      `${process.env.VUE_APP_SUPABASE_URL}/storage/v1/object/public/storage/articles/${currentArticle.path}/markdown.md`
    );
    if (!markdownResponse.ok) {
      console.log(`An error has occurred: ${markdownResponse.status}`);
      this.loading = false;
      this.error = true;
      return;
    }
    this.markdown = await markdownResponse.text();
    this.loading = false;
  },
};
</script>

<style scoped>
@import "@/assets/styles/highlight.css";
.md {
  max-width: 700px;
  margin: 0 auto;
}
.spacer {
  margin-top: 4rem;
}
</style>
