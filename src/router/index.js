import Vue from "vue";
import VueRouter from "vue-router";
import Signin from "../views/Signin.vue";
import Class from "../views/Class.vue";
import Profile from "../views/Profile.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/class/:id", // TODO: use dynamic route matching
    name: "Class",
    component: Class,
  },
  {
    path: "/profile", // TODO: use dynamic route matching
    name: "Profile",
    component: Profile,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
