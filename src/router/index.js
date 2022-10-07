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
    component: () =>
      import(/* webpackChunkName: "articles" */ "../views/ArticlesView.vue"),
  },
  {
    path: "/projects",
    name: "projects",
    meta: { title: "Projects" },
    component: () =>
      import(/* webpackChunkName: "projects" */ "../views/ProjectsView.vue"),
  },
  {
    path: "/search",
    name: "search",
    meta: { title: "Search" },
    component: () =>
      import(/* webpackChunkName: "search" */ "../views/SearchView.vue"),
  },
  {
    path: "/article/:id",
    name: "article",
    meta: { title: "Article" },
    props: true,
    component: () =>
      import(
        /* webpackChunkName: "article" */ "../views/ArticleRenderView.vue"
      ),
  },
  {
    path: "/404",
    name: "notFound",
    meta: { title: "404" },
    component: () =>
      import(/* webpackChunkName: "not found" */ "../views/NotFoundView.vue"),
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
  window.scrollTo(0, 0);
  document.title = to.meta.title
    ? to.meta.title + " | NonTechnical Tech"
    : "NonTechnical Tech";
  next();
});

export default router;
