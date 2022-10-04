<script>
export default {
  name: "SearchView",
};
</script>

<script setup>
import SpinLoader from "@/components/SpinLoader.vue";
import ArticleCard from "@/components/ArticleCard.vue";
import ProjectCard from "@/components/ProjectCard.vue";
import { ref, computed, watch } from "vue";
import { useFetch } from "@/composables/fetch.js";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

let { title, tag, type } = route.query;
const query = ref({
  tag: tag || "",
  title: title || "",
  type: type || "all",
});
const queryTags = ref(tag?.split(",") || []);

const {
  data: articleData,
  loading: loadingArticle,
  error: errorArticle,
} = useFetch(
  `${process.env.VUE_APP_SUPABASE_URL}/storage/v1/object/public/storage/data/blogStorage.json`,
  "json"
);
const {
  data: projectData,
  loading: loadingProject,
  error: errorProject,
} = useFetch(
  `${process.env.VUE_APP_SUPABASE_URL}/storage/v1/object/public/storage/data/projectStorage.json`,
  "json"
);

const loading = computed((e) => loadingProject.value || loadingArticle.value);
const error = computed((e) => errorProject.value || errorArticle.value);
const articles = computed((e) => articleData.value?.articles || []);
const projects = computed((e) => projectData.value?.projects || []);
const allTags = computed(() => {
  let output = [];
  for (let item of [...articles.value, ...projects.value]) {
    output = [...new Set([...output, ...item.tags])];
  }
  return output.sort((a, b) => a.localeCompare(b));
});

const filter = computed(() => {
  return [...articles.value, ...projects.value].filter((e) => {
    if (!e.name.toLowerCase().includes(query.value.title.toLowerCase())) {
      return false;
    }
    if (query.value.type === "article" && !e.date) {
      return false;
    }
    if (query.value.type === "project" && !e.link) {
      return false;
    }
    for (let tag of query.value.tag.split(",").filter((e) => e)) {
      if (!e.tags.includes(tag)) {
        return false;
      }
    }
    return true;
  });
});

watch(
  () => query,
  (newer) => {
    router.replace({ name: "search", query: newer.value });
  },
  { deep: true }
);

watch(queryTags, (newer) => {
  query.value.tag =
    newer.filter((e) => e).length === 0 ? "" : newer.filter((e) => e).join(",");
});

const tagClick = (event) => {
  let element = event.target;
  if (queryTags.value.includes(element.innerText)) {
    queryTags.value = queryTags.value.filter(
      (item) => item !== element.innerText
    );
  } else {
    queryTags.value = [...queryTags.value, element.innerText];
  }
};
</script>

<template>
  <h1>Search</h1>
  <div class="card">
    <div class="content">
      <div class="split">
        <input type="text" v-model="query.title" placeholder="Search Title" />
        <div>
          <b>Show</b>
          <label class="flex" for="all"
            ><input
              id="all"
              type="radio"
              name="type"
              value="all"
              v-model="query.type"
            />All</label
          >
          <label class="flex" for="article"
            ><input
              id="article"
              type="radio"
              name="type"
              value="article"
              v-model="query.type"
            />Articles</label
          >
          <label class="flex" for="project"
            ><input
              id="project"
              type="radio"
              name="type"
              value="project"
              v-model="query.type"
            />Projects</label
          >
        </div>
      </div>
      <template v-for="(tag, index) in allTags" :key="index">
        <span
          class="tag"
          :class="{ click: queryTags.includes(tag) }"
          @click="tagClick"
          >{{ tag }}</span
        >
      </template>
    </div>
  </div>
  <SpinLoader v-if="loading" />
  <h2 v-else-if="error">An Error Occurred</h2>
  <h2 v-else-if="filter.length === 0">No Items Were Found</h2>
  <div v-else class="split">
    <template v-for="(item, index) in filter" :key="index">
      <ArticleCard v-if="item.date" :article="item" />
      <ProjectCard v-else :project="item" />
    </template>
  </div>
</template>

<style scoped>
h2 {
  text-align: center;
}
label {
  cursor: pointer;
}
input[type="text"] {
  cursor: pointer;
  width: 50%;
  border-radius: 0.5rem;
  padding: 0.5rem;
  border: 0.1rem solid var(--border);
  background-color: var(--bg);
  color: var(--color);
  font-family: inherit;
  font-size: inherit;
  display: block;
  margin: 0 auto;
}
input[type="text"]:focus {
  border-color: var(--primary);
  outline: none;
}
.flex {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0;
}
input[type="radio"] {
  cursor: pointer;
  appearance: none;
  background-color: transparent;
  background-clip: content-box;
  padding: 0.1rem;
  margin: 0;
  margin-right: 0.25rem;
  width: 0.75rem;
  height: 0.75rem;
  border: 0.1rem solid var(--primary);
  border-radius: 50%;
}
input[type="radio"]:checked {
  background-color: var(--primary);
}
.click {
  text-decoration: underline;
}
</style>
