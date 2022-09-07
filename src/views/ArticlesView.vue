<script>
export default {
  name: "ArticlesView",
};
</script>

<script setup>
import ArticleCard from "@/components/ArticleCard.vue";
import SpinLoader from "@/components/SpinLoader.vue";
import { useFetch } from "@/compostables/fetch.js";

const { data, loading, error } = useFetch(
  `${process.env.VUE_APP_SUPABASE_URL}/storage/v1/object/public/storage/data/blogStorage.json`,
  "json"
);
</script>

<template>
  <h1>
    <span class="primary">For</span> Article
    <span class="primary">Of</span> Articles
  </h1>
  <SpinLoader v-if="loading" />
  <h2 v-else-if="error">An Error Occurred</h2>
  <div v-else class="split">
    <ArticleCard
      v-for="article in [...data.articles].reverse()"
      :key="article.id"
      :article="article"
    />
  </div>
</template>

<style scoped>
.card {
  margin-top: 0px;
}
</style>
