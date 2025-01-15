import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/HomeView.vue";
import AboutMe from "../views/AboutMeView.vue";
import Blogs from "../views/BlogView.vue";
import Projects from "../views/ProjectsView.vue";
import Contact from "../views/ContactView.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/about",
    name: "about",
    component: AboutMe,
  },
  {
    path: "/blogs",
    name: "blogs",
    component: Blogs,
  },
  {
    path: "/projects",
    name: "projects",
    component: Projects,
  },
  {
    path: "/contact",
    name: "contact",
    component: Contact,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
