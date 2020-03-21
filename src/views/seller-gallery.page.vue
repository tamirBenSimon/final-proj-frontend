<template>
  <section class="seller-gallery-container">
    <h2>Meet the artist:</h2>
    <pre>{{user}}</pre>
    <product-list :artworks="artworks" />
  </section>
</template>

<script>
import productList from "../components/product-list.cmp";

export default {
  name: "gallery-container",
  components: {
    productList,
  },
  data() {
    return {
      selectedUser: null
    }
  },
  created() {
    this.$store.dispatch({
      type: "getUserById", userId : this.$router.params.id
    });
    this.$store.dispatch({
      type: "loadArtworks"
    });

  },
  methods:{

  },
  computed: {
    artworks() {
      return this.$store.getters.artworks;
    }
  }
}
</script>