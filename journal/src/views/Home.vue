<template>
  <div class="home">
    <nav class="main-nav">
      <div>
        <h3 class="title">{{ title }}</h3>
      </div>
      <Burger></Burger>
    </nav>

    <Sidebar>
      <h1 class="title-sidebar">{{ title }}</h1>
      <ul class="sidebar-panel-nav">
        <li><a href="#about">My Journal</a></li>
        <li><a href="#contact">New Entry</a></li>
        <li>
          <a href="/profile">Profile</a>
        </li>
        <li><a href="/">Logout</a></li>
      </ul>
    </Sidebar>
  </div>
</template>

<script>
import Burger from "../components/Menu/Burger.vue";
import Sidebar from "../components/Menu/Sidebar.vue";
export default {
  name: "app",
  components: {
    Burger,
    Sidebar
  },
  data() {
    return { title: "Journal App" };
  },
  computed: {
    user() {
      //this is cached until the dependecy is changed
      return this.$store.state.userId;
    },
    isBurgerActive() {
      return this.$store.state.isNavOpen;
    }
  }
};
</script>
