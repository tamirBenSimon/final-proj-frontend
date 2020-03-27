<template>
  <section class="seller-gallery-container">
    <h2>Meet the artist:</h2>
    <img class="seller-gallery-img" :src="user.imgUrl">
    <h4>{{user.fullName}}</h4>
    <h5>A member since: {{yearJoined}}</h5>
    <h4>Artist's bio: {{user.bio}}</h4>
    <button @click="onIsMsg">Chat With Seller</button>
    <product-list :artworks="artworks" />
    <chat-seller v-if="isMsg" @close="onIsMsg" class="seller-gallery-chat-seller" />
  </section>
</template>

<script>
import productList from "../components/product-list.cmp";
import chatSeller from "../components/chat-seller.cmp";

export default {
  name: "gallery-container",
  components: {
    productList,
    chatSeller
  },
  data() {
    return {
      selectedUser: null,
      isMsg: false
    }
  },
created() {
    const userId = this.$route.params.id;
    console.log('userID ,  ' ,userId)
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
      console.log('this.$store.getters.artworks',this.$store.getters.artworks);
      return this.$store.getters.artworks;
    },
    user() {
      return this.$store.getters.selectedUser;
    }
  },
  methods:{
    onIsMsg(){
      this.isMsg = !this.isMsg;
    }
  }
};
</script>
