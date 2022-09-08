<script>
export default {
  name: "ArticleCard",
};
</script>

<script setup>
import { computed } from "vue";
import TagList from "@/components/TagList.vue";

const props = defineProps(["article"]);

// Prefix relative links
const imageSrc = computed(() => {
  if (!props.article.image.startsWith("https://")) {
    return `${process.env.VUE_APP_SUPABASE_URL}/storage/v1/object/public/storage/articles/${props.article.path}/${props.article.image}`;
  }
  return props.article.image;
});
</script>

<template>
  <div class="card">
    <router-link
      v-if="article.image"
      :to="{ name: 'article', params: { id: article.id } }"
      ><img :src="imageSrc"
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
