import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import VueFeather from "vue-feather";
import VueSupabase from "vue-supabase";

const app = createApp(App);

app.use(VueSupabase, {
  supabaseUrl: process.env.VUE_APP_SUPABASE_URL,
  supabaseKey: process.env.VUE_APP_SUPABASE_ANON,
  supabaseOptions: {},
});

app.component(VueFeather.name, VueFeather);

app.use(router).mount("#app");
