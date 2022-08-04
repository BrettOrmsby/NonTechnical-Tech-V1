<template>
  <div class="container" v-html="md2html"></div>
</template>

<script>
import { marked } from "marked";
import hljs from "highlight.js";
export default {
  name: "ArcticleRederView",
  props: ["article", "id"],
  data() {
    return {
      markdown: "<h1>works</h1><h1>works</h1><h1>works</h1>",
    };
  },
  computed: {
    md2html() {
      marked.setOptions({
        renderer: new marked.Renderer(),
        highlight: function (code, lang) {
          const language = hljs.getLanguage(lang) ? lang : "plaintext";
          return hljs.highlight(code, { language }).value;
        },
        langPrefix: "hljs language-",
        baseUrl: "",
        headerPrefix: "",
      });
      console.log(marked.parse(this.markdown));
      return marked.parse(this.markdown);
    },
  },
  /*
  mount() {
    try {
      let response = await fetch("md.md");
      let data = await response.text();
      this.markdown = data;
    } catch (e) {
      this.markdown = "There was an error";
    }
  },*/
};
</script>
