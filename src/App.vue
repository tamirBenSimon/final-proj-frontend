<template>
  <div id="app">
    <nav-bar />
    <router-view />
    <div class="screen" @click="toggleNavBar"></div>
    <footer-bar />
  </div>
</template>

<script>
import navBar from "./components/nav-bar.cmp";
import footerBar from "./components/footer.cmp";

export default {
  components: {
    navBar,
    footerBar
  },
  methods: {
    toggleNavBar() {
      document.body.classList.toggle("menu-open");
    }
  }
};
</script>

<style lang="scss">
</style>
