import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import MyProfile from "../views/MyProfile.vue";
import NewJournalEntry from "../views/NewJournalEntry.vue";
import EditEntry from "../views/EditEntry.vue";
import NewCategory from "../views/NewCategory.vue";
import EditCategory from "../views/EditCategory.vue";

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
    name: "NewJournalEntry",
    component: NewJournalEntry
  },
  {
    path: "/category",
    name: "NewCategory",
    component: NewCategory
  },
  {
    path: "/edit-entry",
    name: "EditEntry",
    component: EditEntry
  },
  {
    path: "/edit-category",
    name: "EditCategory",
    component: EditCategory
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
