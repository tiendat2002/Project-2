import { createRouter, createWebHistory } from "vue-router";

import About from "../pages/About.vue";
import Home from "../pages/Home.vue";
import Blog from "../pages/Blog.vue";
import Contact from "../pages/Contact.vue";
import SingleBlog from "../pages/SingleBlog.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Dashboard from "../pages/Dashboard.vue";
import CreateCategory from "../pages/categories/CreateCategory.vue";
import CategoriesList from "../pages/categories/CategoriesList.vue";
import EditCategory from "../pages/categories/EditCategory.vue";
import CreatePost from "../pages/posts/CreatePost.vue";
import DashboardPostsList from "../pages/posts/DashboardPostsList.vue";
import EditPost from "../pages/posts/EditPost.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/blog",
    name: "Blog",
    component: Blog,
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresGuest: true },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { requiresGuest: true },
  },
  {
    path: "/dash-board",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/blog/:slug/:id",
    name: "SingleBlog",
    component: SingleBlog,
    props: true,
  },
  {
    path: "/categories/create",
    name: "CreateCategory",
    component: CreateCategory,
    meta: { requiresAuth: true },
  },
  {
    path: "/categories",
    name: "CategoriesList",
    component: CategoriesList,
    meta: { requiresAuth: true },
  },
  {
    path: "/categories/:id/edit",
    name: "EditCategory",
    component: EditCategory,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: "/posts/create",
    name: "CreatePost",
    component: CreatePost,
    meta: { requiresAuth: true },
  },
  {
    path: "/dashboard-posts",
    name: "DashboardPostsList",
    component: DashboardPostsList,
    meta: { requiresAuth: true },
  },
  {
    path: "/posts/:slug/edit",
    name: "EditPost",
    component: EditPost,
    meta: { requiresAuth: true },
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from) => {
  const authenticated = localStorage.getItem("authentication");
  if (to.meta.requiresGuest && authenticated) {
    return {
      name: "Dashboard",
    };
  } else if (to.meta.requiresAuth && !authenticated) {
    return {
      name: "Login",
    };
  }
});

export default router;
