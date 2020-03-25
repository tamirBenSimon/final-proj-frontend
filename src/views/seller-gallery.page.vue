<template>
  <section class="seller-gallery-container">
    <h2>Meet the artist:</h2>
    <!-- <pre>{{ user }}</pre> -->
    <img class="seller-gallery-img" :src="user.imgUrl">
    <h4>{{user.fullName}}</h4>
    <h5>A member since: {{yearJoined}}</h5>
    <h4>Artist's bio: {{user.bio}}</h4>
    <product-list :artworks="artworks" />
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
    const userId = this.$route.params.id;
    this.$store.dispatch({
      type: "loadUser", userId : userId
    });
    this.$store.dispatch({
      type: "loadArtworks", filterBy: {creatorId: userId}
    });
  },
  computed: {
    yearJoined() {
      var date = new Date(this.$store.getters.selectedUser.createdAt);
      return date.getFullYear();
    },
    artworks() {
      return this.$store.getters.artworks;
    },
    user() {
      return this.$store.getters.selectedUser;
    }
  }
};
</script>
