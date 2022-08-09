<template>
  <div class="card">
    <h3 style="margin-bottom: 0.2em; margin-top: 0">{{ article.name }}</h3>
    <div style="margin: 0">
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
