<template>
  <router-link class="artwork-prev" :to="getURL">
    <!-- <transition name="el-fade-in-linear"> -->
    <div class="artwork-prev-img-container" shadow="hover">
      <div class="artwork-prev-txt-container flex-center">
        <img class="artwork-prev-img" :src="Showartwork" alt="Artwork" />

        <div class="artwork-prev-container-flach">
          <div class="artwork-prev-txt-header">
            <h4>{{ artwork.title }}</h4>
            <h4>
              <span class="artwork-prev-USD">$</span>
              {{ artwork.price }}
            </h4>
          </div>

          <router-link :to="'/sellerGallery/' + artwork.createdBy._id">
            <div class="artwork-prev-created-by">
              <img class="artwork-prev-cretadBy-img" :src="artwork.createdBy.imgURL" alt />

              <span class="artwork-prev-createdBy-fullName">{{ artwork.createdBy.fullName }}</span>

              <div class="prev-wishlist-container">
                <el-popover
                  v-if="!isWishlist"
                  @click.prevent="onWishlist"
                  placement="bottom-end"
                  width="20px"
                  trigger="hover"
                  content="Add to wishlist"
                >
                  <i
                    slot="reference"
                    @click.prevent="onWishlist"
                    class="fas fa-heart artwork-prev-wishlist-icon"
                  ></i>
                </el-popover>
                <el-popover
                  v-else
                  @click.prevent="onWishlist"
                  placement="bottom-end"
                  width="20px"
                  trigger="hover"
                  content="Remove from wishlist"
                >
                  <i
                    class="fas fa-heart artwork-prev-wishlist-icon-added"
                    slot="reference"
                    @click.prevent="onWishlist"
                  ></i>
                </el-popover>
              </div>
            </div>
          </router-link>
          <div class="artwork-prev-controle-pad">
            <i class="el-icon-delete" @click.prevent="remove"></i>

            <router-link :to="'/artwork/edit/' + this.artwork._id">
              <i class="el-icon-edit"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- </transition> -->
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
  created() {
    this.loggedinUser = this.$store.getters.loggedinUser;
  },
  computed: {
    getURL() {
      return "/artwork/" + this.artwork._id;
    },
    isInStock() {
      return this.artwork.inStock ? "available" : "currently not available";
    },
    Showartwork() {
      return this.artwork.imgURLs[this.imgUrlIdx];
    },
    getSrc() {
      return this.currSrc;
    }
  },
  methods: {
    remove() {
      eventBus.$emit(EVENT_REMOVE, this.artwork._id);
    },
    onWishlist() {
      var userId = this.loggedinUser._id;
      var product = this.artwork;
      if (!this.isWishlist) {
        eventBus.$emit("addWishlist", userId, product);
      } else {
        this.$store.dispatch({
          type: "removeFromWishlist",
          productId: product._id,
          userId
        });
      }
      this.isWishlist = !this.isWishlist;
    }
  }
};
</script>
