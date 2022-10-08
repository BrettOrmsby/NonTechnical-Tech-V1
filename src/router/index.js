import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { title: "Home" },
  },
  {
    path: "/articles",
    name: "articles",
    meta: { title: "Articles" },
    component: () => import("../views/ArticlesView.vue"),
  },
  {
    path: "/projects",
    name: "projects",
    meta: { title: "Projects" },
    component: () => import("../views/ProjectsView.vue"),
  },
  {
    path: "/search",
    name: "search",
    meta: { title: "Search" },
    component: () => import("../views/SearchView.vue"),
  },
  {
    path: "/article/:id",
    name: "article",
    meta: { title: "Article" },
    props: true,
    component: () => import("../views/ArticleRenderView.vue"),
  },
  {
    path: "/404",
    name: "notFound",
    meta: { title: "404" },
    component: () => import("../views/NotFoundView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    beforeEnter() {
      window.location = `/404`;
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  next();
  window.scrollTo(0, 0);
  document.title = to.meta.title
    ? to.meta.title + " | NonTechnical Tech"
    : "NonTechnical Tech";
});

export default router;
