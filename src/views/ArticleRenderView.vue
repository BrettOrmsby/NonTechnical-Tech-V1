<template>
  <template v-if="loading">
    <div class="spacer"></div>
    <SpinLoader />
  </template>
  <h1 v-else-if="error">There Was an Error</h1>
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
  name: "ArcticleRederView",
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
        baseUrl:
          "https://wfrgrcqleolejyoojiwj.supabase.co/storage/v1/object/public/images/",
        headerPrefix: "",
      });
      return marked.parse(this.markdown);
    },
  },
  async mounted() {
    let id = this.id;
    let data = await this.$supabase.storage
      .from("articles")
      .download("blogStorage.json");
    if (data.error !== null) {
      console.log(data.error);
      this.loading = false;
      this.error = true;
      return;
    }
    let articles = JSON.parse(await data.data.text()).articles;
    let currentArticle = articles.filter((e) => e.id === id)[0];
    if (currentArticle) {
      this.article = currentArticle;
      document.title = currentArticle.name + " | NonTechnical Tech";
    } else {
      window.location = "/404";
      return;
    }
    data = await this.$supabase.storage
      .from("articles")
      .download("markdown/" + currentArticle.path + ".md");
    if (data.error !== null) {
      console.log(data.error);
      this.loading = false;
      this.error = true;
      return;
    }
    this.loading = false;
    this.markdown = await data.data.text();
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
  margin-top: 3rem;
}
</style>
