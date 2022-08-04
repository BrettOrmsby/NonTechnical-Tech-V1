import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/articles",
    name: "articles",
    component: () =>
      import(/* webpackChunkName: "articles" */ "../views/ArticlesView.vue"),
  },
  {
    path: "/articles/:id",
    name: "article",
    props: true,
    component: () =>
      import(
        /* webpackChunkName: "articles" */ "../views/ArticleRenderView.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
