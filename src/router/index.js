import Vue from "vue";
import VueRouter from "vue-router";
import Signin from "../views/Signin.vue";
import Class from "../views/Class.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/classidhere", // TODO: use dynamic route matching
    name: "Class",
    component: Class,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
