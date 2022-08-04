<template>
  <div class="container">
    <h1>
      <span class="monospace"
        ><strong><span class="primary">Non</span>Technical Tech</strong></span
      >
    </h1>
    <p class="container card">
      Hi, I'm Brett Ormsby and I write a non-technical blog about solving
      problem in ways that come to my mind and are not as optimized or techical
      as others. My current Interests are Scriptable, Vue.js and JavaScript.
    </p>

    <div class="split">
      <div>
        <h2><span class="primary">new</span> Article()</h2>
        <ArticleCard :article="latest" />

        <router-link to="articles"><button>View All</button></router-link>
      </div>
      <div>
        <h2><span class="primary">new</span> Project()</h2>
        <div class="card">
          <h3 style="margin-bottom: 0.2em; margin-top: 0">This Is The Title</h3>
          <p>
            This is what the whole thing is about and only a quick simple
            example sentance.
            <br />
            <a href="">Learn More</a>
          </p>
        </div>
        <button>View All</button>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleCard from "@/components/ArticleCard.vue";
export default {
  name: "HomeView",
  components: {
    ArticleCard,
  },
  data() {
    return {
      articles: require("@/assets/blogStorage.json"),
    };
  },
  computed: {
    latest() {
      return this.articles.articles[this.articles.articles.length - 1];
    },
  },
};
</script>
