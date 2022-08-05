<template>
  <div class="container">
    <h1>{{ article.name }}</h1>
    <div class="card" style="max-width: 700px; margin: 0 auto">
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
    <div v-html="md2html" class="md"></div>
  </div>
</template>

<script>
import { marked } from "marked";
import hljs from "highlight.js";
export default {
  name: "ArcticleRederView",
  data() {
    return {
      markdown: "",
      article: {
        name: "Something Went Wrong",
        date: "",
        readTime: "0",
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
        baseUrl: "/articles/" + this.article.path + "/",
        headerPrefix: "",
      });
      return marked.parse(this.markdown);
    },
  },
  async mounted() {
    let id = this.id;
    let articles = require("@/assets/blogStorage.json").articles;
    let currentArticle = articles.filter((e) => e.id === id)[0];
    if (currentArticle) {
      this.article = currentArticle;
    }
    try {
      let response = await fetch(
        "/articles/" + this.article.path + "/markdown.md"
      );
      let data = await response.text();
      this.markdown = data;
    } catch (e) {
      console.log(e);
      this.markdown = "There was an error loading the markdown file.";
    }
  },
};
</script>
