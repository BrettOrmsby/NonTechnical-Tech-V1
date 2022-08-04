<template>
  <div class="container">
    <h1>
      <span class="primary">For</span> Article
      <span class="primary">Of</span> Articles
    </h1>
    <div class="split" style="margin: 0">
      <ArticleCard
        v-for="article in [...articles].reverse()"
        :key="article.id"
        :article="article"
      />
    </div>
  </div>
</template>

<script>
import ArticleCard from "@/components/ArticleCard.vue";
export default {
  name: "ArticlesView",
  components: {
    ArticleCard,
  },
  data() {
    return {
      articles: require("@/assets/blogStorage.json").articles,
    };
  },
};
</script>

<style>
.card {
  margin-top: 0px;
}
</style>
