<template>
  <h1>
    <span class="primary">For</span> Article
    <span class="primary">Of</span> Articles
  </h1>
  <SpinLoader v-if="loading" />
  <h2 v-else-if="error">An Error Occurred</h2>
  <div v-else class="split">
    <ArticleCard
      v-for="article in [...articles].reverse()"
      :key="article.id"
      :article="article"
    />
  </div>
</template>

<script>
import ArticleCard from "@/components/ArticleCard.vue";
import SpinLoader from "@/components/SpinLoader.vue";
export default {
  name: "ArticlesView",
  components: {
    ArticleCard,
    SpinLoader,
  },
  data() {
    return {
      loading: true,
      error: false,
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
    };
  },
  async mounted() {
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
    this.articles = data.articles;
    this.loading = false;
  },
};
</script>

<style scoped>
.card {
  margin-top: 0px;
}
</style>
