<template>
  <div class="card">
    <router-link
      v-if="article.image"
      :to="{ name: 'article', params: { id: article.id } }"
      ><img :src="article.image"
    /></router-link>
    <div class="content">
      <router-link :to="{ name: 'article', params: { id: article.id } }"
        ><h3>{{ article.name }}</h3></router-link
      >
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
      </p>
    </div>
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
