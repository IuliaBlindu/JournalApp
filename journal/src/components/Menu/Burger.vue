<template>
  <div>
    <div
      id="burger"
      :class="{ active: isBurgerActive }"
      @click.prevent="toggle()"
    >
      <slot>
        <button type="button" class="burger-button" title="Menu">
          <span class="burger-bar burger-bar--1"></span>
          <span class="burger-bar burger-bar--2"></span>
          <span class="burger-bar burger-bar--3"></span>
        </button>
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    isBurgerActive() {
      return this.$store.state.isNavOpen;
    }
  },
  methods: {
    toggle() {
      console.log("deschide Navbar");
      this.$store.commit("toggleNav");
    }
  }
};
</script>
