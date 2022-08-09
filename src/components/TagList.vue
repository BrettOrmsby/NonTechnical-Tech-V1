<template>
  <router-link
    v-for="(tag, index) in [...tags].sort((a, b) => a.localeCompare(b))"
    :key="index"
    :to="{ name: 'search', query: { tag: tag } }"
    ><span class="tag">{{ tag }}</span></router-link
  >
</template>

<script>
export default {
  name: "TagList",
  props: ["tags"],
};
</script>
