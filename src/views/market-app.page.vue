<template>
  <section class="market-app-container">
    <h2>Welcome To Marketplace!</h2>
    <product-list :artworks="artworks" />
  </section>
</template>

<script>
import productList from "../components/product-list.cmp";

export default {
  name: "market-app",
  components: {
    productList
  },
  created() {
    this.$store.dispatch({
      type: "loadArtworks"
    });
  },
  computed: {
    artworks() {
      return this.$store.getters.artworks;
    }
  }
};
</script>
