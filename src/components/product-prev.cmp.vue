<template>
  <router-link class="artwork-prev" :to="getURL">
    
      <transition name="el-fade-in-linear">
    <div class="artwork-prev-img-container" shadow="hover">
      <div class="artwork-prev-wish-list">
        <img v-if="!isWishlist" @click.prevent="onWishlist" class="artwork-prev-wish-list-img" src="../../public/img/icons/black-like.png" alt="Wish List">
        <img v-else @click.prevent="onWishlist" class="artwork-prev-wish-list-img" src="../../public/img/icons/red-like.png" alt="Wish List">
      </div>

      <div class="artwork-prev-txt-container flex-center">

          <img class="artwork-prev-img" :src="Showartwork" alt="Artwork" />

          <div class="artwork-prev-container-flach">
            <div class="artwork-prev-txt-header">
              <h3>{{ artwork.title }}</h3>
              <h4><span class="artwork-prev-USD">$</span>{{ artwork.price }}</h4>
            </div>
            <router-link :to="'/sellerGallery/'+artwork.createdBy._id">
              <div class="artwork-prev-created-by">
                <img class="artwork-prev-cretadBy-img" :src="artwork.createdBy.imgURL" alt="">
                <span class="artwork-prev-createdBy-fullName">
                  {{ artwork.createdBy.fullName }}
                </span>

                              <i v-if="!isWishlist" @click.prevent="onWishlist"  class="fas fa-heart artwork-prev-wishlist-icon"></i>
                              <i v-else @click.prevent="onWishlist"  class="fas fa-heart artwork-prev-wishlist-icon-added"></i>

              </div>
            </router-link>
            <div class="artwork-prev-controle-pad">

                <i class="el-icon-delete"  @click.prevent="remove"></i>

              <router-link :to="'/artwork/edit/'+ this.artwork._id">
              <i  class="el-icon-edit"></i>
               </router-link>
            </div>
          </div>

      </div>

    </div>
          </transition>
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
      isWishlist: false
    };
  },
  created(){
    this.loggedinUser = this.$store.getters.loggedinUser;
  },
  computed: {
    getURL(){
      return  ('/artwork/' + this.artwork._id)
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
    onWishlist(){
      const userId = this.loggedinUser._id;
      const product = this.artwork;
      eventBus.$emit('addWishlist', userId, product);
      this.isWishlist = !this.isWishlist;
    }
  }
}
</script>