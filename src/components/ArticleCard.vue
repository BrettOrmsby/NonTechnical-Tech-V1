<template>
  <div class="card">
    <h3 style="margin-bottom: 0.2em; margin-top: 0">{{ article.name }}</h3>
    <div style="margin: 0">
      <span
        v-for="(tag, index) in [...article.tags].sort((a, b) =>
          a.localeCompare(b)
        )"
        :key="index"
        class="tag"
        style="margin-bottom: 0"
        >{{ tag }}</span
      >
    </div>
    <p>
      <small>
        {{ article.date }} <span class="primary">•</span>
        {{ article.readTime }}min read</small
      >
      <br />
      {{ article.description }}
      <br />
      <a href="">Read</a>
    </p>
  </div>
</template>

<script>
export default {
  name: "ArticleCard",
  props: ["article"],
};
</script>
