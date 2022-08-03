<template>
  <div class="container">
    <h1>
      <span class="monospace"
        ><strong><span class="primary">Non</span>technical Tech</strong></span
      >
    </h1>
    <p class="container card">
      Hi, I'm Brett Ormsby and I write a
      <span class="primary">non</span>-technical blog about solving problem in
      ways that come to my mind and are not as optimized or techical as others.
      My current Interests are Scriptable, Vue.js and JavaScript.
    </p>

    <h2><span class="primary">new</span> Article()</h2>
    <div class="card">
      <h3 style="margin-bottom: 0.2em; margin-top: 0">{{ latest.name }}</h3>
      <div style="margin: 0">
        <span
          v-for="tag in latest.tags"
          :key="tag"
          class="tag"
          style="margin-bottom: 0"
          >{{ tag }}</span
        >
      </div>
      <p>
        <small>
          {{ latest.date }} <span class="primary">•</span>
          {{ latest.readTime }}min read</small
        >
        <br />
        {{ latest.description }}
        <br />
        <a href="">Read</a>
      </p>
    </div>

    <button>View All</button>

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

  <div id="md" class="container" style="display: block"></div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      articles: require("@/assets/blogStorage.json"),
      loading: false,
    };
  },
  computed: {
    latest() {
      return this.articles.articles[0];
    },
  },
};
</script>
