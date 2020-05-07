<template>
  <section class="seller-gallery-container">
    <h2>Meet the artist:</h2>
    <img class="seller-gallery-img" :src="user.imgUrl" />
    <h4>{{user.fullName}}</h4>
    <h5>A member since: {{yearJoined}}</h5>
    <h4>Artist's bio: {{user.bio}}</h4>
    <button class="seller-gallery-chat-btn btn" @click="onIsMsg">
      Chat
      <span>with {{user.fullName}}</span>
    </button>
    <product-list :artworks="artworks" />
    <chat-seller v-if="isMsg" @close="onIsMsg" class="seller-gallery-chat-seller" />
  </section>
</template>

<script>
import productList from "../components/product-list.cmp";
import chatSeller from "../components/chat-window.cmp";

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
    };
  },
  created() {
    const userId = this.$route.params.id;
    this.$store.dispatch({
      type: "loadUser",
      userId: userId
    });
    this.$store.dispatch({
      type: "loadArtworks",
      filterBy: { creatorId: userId }
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
  },
  methods: {
    onIsMsg() {
      this.isMsg = !this.isMsg;
    }
  }
};
</script>
