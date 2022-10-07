<script>
export default {
  name: "ArticleRenderView",
};
</script>

<script setup>
import SpinLoader from "@/components/SpinLoader.vue";
import { marked } from "marked";
import hljs from "highlight.js";
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
defineProps(["id"]);

const markdown = ref("");
const id = parseInt(route.params.id);
const article = ref();
const loading = ref(true);
const error = ref(false);

onMounted(async () => {
  const response = await fetch(
    `${
      import.meta.env.VITE_SUPABASE_URL
    }/storage/v1/object/public/storage/data/blogStorage.json`
  );
  if (!response.ok) {
    console.log(`An error has occurred: ${response.status}`);
    loading.value = false;
    error.value = true;
    return;
  }
  const data = await response.json();
  let articles = data.articles;

  article.value = articles.filter((e) => e.id === id)[0];
  if (article.value) {
    document.title = article.value.name + " | NonTechnical Tech";
  } else {
    window.location = "/404";
    return;
  }

  const markdownResponse = await fetch(
    `${
      import.meta.env.VITE_SUPABASE_URL
    }/storage/v1/object/public/storage/articles/${
      article.value.path
    }/markdown.md`
  );
  if (!markdownResponse.ok) {
    console.log(`An error has occurred: ${markdownResponse.status}`);
    loading.value = false;
    error.value = true;
    return;
  }
  markdown.value = await markdownResponse.text();
  loading.value = false;
})();

const md2html = computed(() => {
  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
    langPrefix: "hljs language-",
    baseUrl: `${
      import.meta.env.VITE_SUPABASE_URL
    }/storage/v1/object/public/storage/articles/${article.value.path}/`,
    headerPrefix: "",
  });
  return marked.parse(markdown.value);
});
</script>

<template>
  <div class="padding">
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
  </div>
</template>

<style scoped>
@import "@/assets/styles/highlight.css";
.md {
  max-width: 700px;
  margin: 0 auto;
}
.spacer {
  margin-top: 4rem;
}

.padding {
  padding: 0 1rem 0 1rem;
}
</style>
