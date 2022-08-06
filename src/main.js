import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import VueFeather from "vue-feather";
import VueSupabase from "vue-supabase";

const app = createApp(App);

app.use(VueSupabase, {
  supabaseUrl: "https://wfrgrcqleolejyoojiwj.supabase.co",
  supabaseKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmcmdyY3FsZW9sZWp5b29qaXdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTk3ODU1OTgsImV4cCI6MTk3NTM2MTU5OH0.khahyweYgZC3t2XyhDin0pXJKLyDl46iw9H1zhW6sLs",
  supabaseOptions: {},
});

app.component(VueFeather.name, VueFeather);

app.use(router).mount("#app");
