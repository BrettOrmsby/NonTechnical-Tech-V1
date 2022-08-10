<template>
  <h1>
    <span class="primary">For</span> Article
    <span class="primary">Of</span> Articles
  </h1>
  <SpinLoader v-if="loading" />
  <h2 v-else-if="error">There Was An Error</h2>
  <div v-else class="split" style="margin: 0">
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
        },
      ],
    };
  },
  async mounted() {
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
    this.articles = articles;
    this.loading = false;
  },
};
</script>

<style scoped>
.card {
  margin-top: 0px;
}
</style>
