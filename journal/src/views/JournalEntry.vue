<template>
  <div class="entry">
    <div class="hero">
      <nav class="main-nav">
        <div></div>
        <Burger></Burger>
      </nav>

      <span class="userTitle">{{ this.$store.state.userName }}</span>
      <span class="journalTitle">{{pageTitle }}</span>
    </div>

    <Sidebar>
      <span class="userTitleS">{{ this.$store.state.userName }}</span>
      <span class="journalTitleS">{{title }}</span>
      <ul class="sidebar-panel-nav">
        <li>
          <router-link to="/home">
            <Journal />My Journal
          </router-link>
        </li>
        <li>
          <router-link to="/entry">
            <NewEntry />New Entry
          </router-link>
        </li>
        <li>
          <router-link to="/profile">
            <Profile />Profile
          </router-link>
        </li>
        <li>
          <router-link to="/">
            <Logout />Logout
          </router-link>
        </li>
      </ul>
    </Sidebar>
  </div>
</template>

<script>
import Burger from "../components/Menu/Burger.vue";
import Sidebar from "../components/Menu/Sidebar.vue";
import Journal from "../assets/icons/Journal";
import NewEntry from "../assets/icons/NewEntry";
import Profile from "../assets/icons/Profile";
import Logout from "../assets/icons/Logout";
export default {
  name: "JournalEntry",
  components: {
    Burger,
    Sidebar,
    Journal,
    NewEntry,
    Profile,
    Logout
  },
  data() {
    return { title: "'s journal", pageTitle: "'s new entry" };
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
