<template>
  <section class="seller-gallery-container">
    <h2>Meet the artist:</h2>
    <pre>{{ user }}</pre>
    <product-list :artworks="artworks" />
    <h2>after the list</h2>
  </section>
</template>

<script>
import productList from "../components/product-list.cmp";

export default {
  name: "gallery-container",
  components: {
    productList
  },
  data() {
    return {
      selectedUser: null
    }
  },



created() {
    const userId = +this.$route.params.id;
    this.$store.dispatch({
      type: "loadUser", userId : userId
    });
    this.$store.dispatch({
      type: "loadArtworks", filterBy: {creatorId: userId}
    });
  },

  methods: {},
  computed: {
    artworks() {
      return this.$store.getters.artworks;
    },
    user() {
      return this.$store.getters.selectedUser;
    }
  }
};
</script>
