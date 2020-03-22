<template>
  <router-link class="artwork-prev" :to="getURL">
    <div class="artwork-prev-img-container">
      <div class="artwork-prev-wish-list">
        <img @click.prevent="onWishList" @mouseover="onHoverWishList" @mouseleave="onLeaveWishList" class="artwork-prev-wish-list-img" src="../../public/img/icons/black-like.png" alt="Wish List">
      </div>
      <img  :src="Showartwork" alt="" />
      <div class="artwork-prev-txt-container">
        <div class="artwork-prev-txt-header">
          <h3>{{ artwork.title }}</h3>
          <span>{{ artwork.price }}USD</span>
        </div>
        <span class="artwork-prev-createdBy-fullName">
          {{ artwork.createdBy.fullName }}</span
        >
        <!-- <span>{{  artwork.desc }}</span> <br> -->
        <span>{{ isInStock }}</span>
        <div class="artwork-prev-controle-pad">
          <button @click.prevent="remove">remove</button>
          <router-link :to="'/artwork/edit/'+ this.artwork._id"> Edit</router-link>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import { eventBus, EVENT_REMOVE } from "../services/event-bus.service.js";
export default {
  name: "product-prev",
  props: {
    artwork: Object
  },
  data() {
    return {
      imgUrlIdx: 0,
      currSrc:'../../public/img/icons/black-like.png',
      loggedinUser: null,
    };
  },
  created(){
    this.loggedinUser = this.$store.getters.loggedinUser;
  },
  mounted() {
    setInterval(() => {
      this.imgUrlIdx =
        this.imgUrlIdx === this.artwork.imgURLs.length - 1
          ? 0
          : this.imgUrlIdx + 1;
    }, 7000);
  },
  computed: {
    getURL(){
      return  ('/artwork/' + this.artwork._id)
    //  this.$route.params.id? : ('/artwork/edit/'+ this.artwork._id)
    },
    isInStock() {
      return this.artwork.inStock ? "available" : "currently not available";
    },
    Showartwork() {
      return this.artwork.imgURLs[this.imgUrlIdx];
    },
    getSrc(){
      return this.currSrc;
    }
  },
  methods: {
    remove() {
      eventBus.$emit(EVENT_REMOVE, this.artwork._id);
    },
    onHoverWishList(){
      this.currSrc="../../public/img/icons/red-like.png";
    },
    onLeaveWishList(){
       this.currSrc="../../public/img/icons/black-like.png";
    },
    onWishList(){
      const userId = this.loggedinUser._id;
      const product = this.artwork;
      eventBus.$emit('addWishList', userId, product);
    }
  }
}
</script>

<style></style>
