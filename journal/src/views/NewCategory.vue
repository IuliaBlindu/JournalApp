<template>
  <div class="home">
    <div class="hero">
      <nav class="main-nav">
        <div></div>
        <Burger></Burger>
      </nav>
      <span class="userTitle">{{ user }}</span>
      <span class="journalTitle">{{ title }}</span>
    </div>
    <div class="entryDiv">
      <CategoryForm />
    </div>
    <Sidebar>
      <span class="userTitleS">{{ user }}</span>
      <span class="journalTitleS">{{ title }}</span>
      <ul class="sidebar-panel-nav">
        <li>
          <router-link to="/home">
            <Journal style="float: left; margin-right: 4px" /> My Journal
          </router-link>
        </li>
        <li>
          <router-link to="/entry">
            <NewEntry style="float: left; margin-right: 4px" />New Entry
          </router-link>
        </li>
        <li>
          <router-link to="/">
            <Logout style="float: left; margin-right: 4px" />Logout
          </router-link>
        </li>
      </ul>
    </Sidebar>
  </div>
</template>

<script>
import Burger from "../components/Menu/Burger.vue";
import Sidebar from "../components/Menu/Sidebar.vue";
import CategoryForm from "../components/CategoryForm.vue";

import Journal from "../assets/icons/Journal";
import NewEntry from "../assets/icons/NewEntry";
import Logout from "../assets/icons/Logout";
export default {
  name: "NewCategory",
  components: {
    Burger,
    Sidebar,
    Journal,
    NewEntry,
    Logout,
    CategoryForm,
  },
  data() {
    return { title: "'s new category" };
  },
  computed: {
    isBurgerActive() {
      return this.$store.state.isNavOpen;
    },
    user() {
      return localStorage.userName;
    },
  },
  beforeMount() {
    this.$store.commit("setCategory", "add");
  },
};
</script>
