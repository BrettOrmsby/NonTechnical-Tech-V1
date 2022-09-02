<template>
  <div class="card">
    <h3>{{ article.name }}</h3>
    <div class="tags">
      <TagList :tags="article.tags" />
    </div>
    <p>
      <small>
        {{ article.date }} <span class="primary">•</span>
        {{ article.readTime }}min read</small
      >
      <br />
      {{ article.description }}
      <br />
      <router-link :to="{ name: 'article', params: { id: article.id } }"
        >Read</router-link
      >
    </p>
  </div>
</template>

<script>
import TagList from "@/components/TagList.vue";
export default {
  components: { TagList },
  name: "ArticleCard",
  props: ["article"],
};
</script>
