import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/HomeView.vue";
import AboutMe from "../views/AboutMeView.vue";
import BlogView from "../views/BlogView.vue";
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
    component: BlogView,
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
  scrollBehavior() {
    // always scroll to top when navigating to a new route
    return { top: 0 };
  },
});

export default router;
