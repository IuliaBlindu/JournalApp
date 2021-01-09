import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import MyProfile from "../views/MyProfile.vue";
import JournalEntry from "../views/JournalEntry.vue";
import NewCategory from "../views/NewCategory.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/profile",
    name: "Profile",
    component: MyProfile
  },
  {
    path: "/entry",
    name: "JournalEntry",
    component: JournalEntry
  },
  {
    path: "/category",
    name: "NewCategory",
    component: NewCategory
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
