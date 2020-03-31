<template>
  <section class="home-main-layout">

    <header-two />

    <product-list class="artwork-list-home-container"
      v-for="tag in homeTags"
      :artworks="getArtWorksByTag(tag)"
      :key="tag">
      <h3 class="artwork-list-title">Start Exploring<span class="span"> {{ tag }}</span></h3>
      <div class="artwork-list-more-main">
        <router-link :to="{name:'market-app', params:{tag:tag}}">
        <h3 class="artwork-list-more-btn btn">More</h3>
        </router-link>
      </div>
    </product-list>

    <div class="home-artists-img-container-main" v-if="users">
      <div class="home-artists-img-container" v-for="(user, index) in users" :key="index">
        <router-link :to="'/sellerGallery/' + user._id">
          <img class="home-artists-img" :src="user.imgUrl" alt="Image Artist">
          <div class="home-artists-title">{{user.fullName}}</div>
        </router-link>
      </div>
    </div>

    <!-- <div class="home-extra-main">
        <img class="home-extra-img1" src="../../public/img/gallery/img5.jpg">
        <img class="home-extra-img2" src="../../public/img/gallery/img2.jpg">
        <img class="home-extra-img3" src="../../public/img/gallery/img3.jpg">
        <img class="home-extra-img4" src="../../public/img/gallery/img4.jpg">      
    </div> -->

  </section>
</template>

<script>
import productList from "../components/product-list.cmp";
import headerTwo from "../components/home-header-to-app.cmp";
import { eventBus } from "../services/event-bus.service.js";

export default {
    data() {
    return {
      // filterBy: {   : "urban" },
      homeTags: ["nature", "urban", "psychedelic"],
      users: null
    };
  },
  name: "home-page",
  created() {
    this.$store.dispatch({
      type: "loadArtworks",
      // filterBy: {limit: 30}
    });
    
    eventBus.$on('addWishlist', (userId, product) =>{
        this.$store.dispatch({
          type: 'addToWishlist',
          userId: userId, 
          product: product 
        })
      })

    this.$store.dispatch({
      type: "loadUsers"
    })
    .then(currUsers =>{
      this.users = currUsers;
    })
  },
  beforeDestroy(){
    eventBus.$off()
  },
  methods: {
    getArtWorksByTag(tag) {
    let artworks = this.artworks;
    let tagSortedArtworks = artworks.filter(artwork => {
      return artwork.tags.includes(tag);
    });
    return tagSortedArtworks.slice(0, 4);
    },
  },
  computed: {
    artworks() {
      return this.$store.getters.artworks;
    }
  },
  components: {
    productList,
    headerTwo
  }
}
</script>
