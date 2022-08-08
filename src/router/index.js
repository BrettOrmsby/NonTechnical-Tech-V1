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
    path: "/projects",
    name: "projects",
    component: () =>
      import(/* webpackChunkName: "projects" */ "../views/ProjectsView.vue"),
  },
  {
    path: "/articles/:id",
    name: "article",
    props: true,
    component: () =>
      import(
        /* webpackChunkName: "article" */ "../views/ArticleRenderView.vue"
      ),
  },
  {
    path: "/404",
    name: "notFound",
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
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(() => {
  window.scrollTo(0, 0);
});

export default router;
