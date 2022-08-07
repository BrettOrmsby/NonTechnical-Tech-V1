<template>
  <h1>
    <span class="monospace"
      ><strong><span class="primary">Non</span>Technical Tech</strong></span
    >
  </h1>
  <p class="card">
    Hi, I'm Brett Ormsby and I write a non-technical blog about solving problem
    in ways that come to my mind and are not as optimized or techical as others.
    My current Interests are Scriptable, Vue.js and JavaScript.
  </p>

  <div class="split">
    <div>
      <h2><span class="primary">new</span> Article()</h2>
      <SpinLoader v-if="loadingArticle" />
      <h3 v-else-if="errorArticle">There Was An Error</h3>
      <ArticleCard v-else :article="latest" />
      <router-link to="articles"><button>View All</button></router-link>
    </div>
    <div>
      <h2><span class="primary">new</span> Project()</h2>
      <div class="card">
        <h3 style="margin-bottom: 0.2em; margin-top: 0">This Is The Title</h3>
        <p>
          This is what the whole thing is about and only a quick simple example
          sentance.
          <br />
          <a href="">Learn More</a>
        </p>
      </div>
      <button>View All</button>
    </div>
  </div>
</template>

<script>
import SpinLoader from "@/components/SpinLoader.vue";
import ArticleCard from "@/components/ArticleCard.vue";
export default {
  name: "HomeView",
  components: {
    SpinLoader,
    ArticleCard,
  },
  data() {
    return {
      loadingArticle: true,
      errorArticle: false,
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
  computed: {
    latest() {
      return this.articles[this.articles.length - 1];
    },
  },
  async mounted() {
    let data = await this.$supabase.storage
      .from("articles")
      .download("blogStorage.json");
    if (data.error !== null) {
      console.log(data.error);
      this.loadingArticle = false;
      this.errorArticle = true;
      return;
    }
    let articles = JSON.parse(await data.data.text()).articles;
    this.articles = articles;
    this.loadingArticle = false;
  },
};
</script>
