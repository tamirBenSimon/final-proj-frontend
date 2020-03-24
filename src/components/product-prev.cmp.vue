<template>
  <router-link class="artwork-prev" :to="getURL">
    <div class="artwork-prev-img-container">
      <div class="artwork-prev-wish-list">
        <img v-if="!isWishList" @click.prevent="onWishList" class="artwork-prev-wish-list-img" src="../../public/img/icons/black-like.png" alt="Wish List">
        <img v-else @click.prevent="onWishList" class="artwork-prev-wish-list-img" src="../../public/img/icons/red-like.png" alt="Wish List">
      </div>
      <img  :src="Showartwork" alt="" />
      <div class="artwork-prev-txt-container">
        <div class="artwork-prev-txt-header">
          <h3>{{ artwork.title }}</h3>
          <span>{{ artwork.price }}USD</span>
        </div>
        <div class="artwork-prev-created-by">
        <img class="artwork-prev-cretadBy-img" :src="artwork.createdBy.imageURL" alt="">
        <span class="artwork-prev-createdBy-fullName">
          {{ artwork.createdBy.fullName }}</span>
        </div>

        <!-- <span>{{ isInStock }}</span> -->
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
      loggedinUser: null,
      isWishList: false
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
    onWishList(){
      const userId = this.loggedinUser._id;
      const product = this.artwork;
      eventBus.$emit('addWishList', userId, product);
      this.isWishList = !this.isWishList;
    }
  }
}
</script>