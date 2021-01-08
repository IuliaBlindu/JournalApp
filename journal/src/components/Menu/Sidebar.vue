<template>
  <div class="sidebar">
    <div
      class="sidebar-backdrop"
      @click="closeSidebarPanel"
      v-if="isPanelOpen"
    ></div>
    <transition name="slide">
      <div v-if="isPanelOpen" class="sidebar-panel">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  computed: {
    isPanelOpen() {
      return this.$store.state.isNavOpen;
    }
  },
  methods: {
    closeSidebarPanel() {
      this.$store.commit("toggleNav");
    }
  }
};
</script>
