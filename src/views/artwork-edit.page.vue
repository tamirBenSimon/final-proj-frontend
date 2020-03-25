<template>
  <section class="artwork-edit-container-all">




    <img
      @click="onBack"
      class="artwork-edit-img-back"
      src="../../public/img/icons/left-arrow.png"
      alt="back"
      title="Back"
    />
        <div class="artwork-edit-container-main">
      <div class="artwork-edit-left-side-container">
        <div class="artwork-edit-galler-container">
          <div class="artwork-details-head-gallery">
            <img
              class="artwork-edit-head-gallery-item"
              v-for="(artworkImgUrl, idx) in artwork.imgURLs"
              :key="idx"
              :src="artworkImgUrl"
              alt=""
              @click="onGalleryIMGClick(idx)"
            />
          </div>
          <div class="artwork-edit-preview-artwork">
            <img
              class="artwork-edit-img-artwork"
              :src="getCurrImg"
              alt="artwork"
            />
          </div>
        </div>
        <button class="set-out-stock setInStock" @click="onRemove">delete</button>
      
        <div class='product-details-container-reviews'>
          <h2>Reviews:</h2>
          <ul class="product-details-reviews-list">
            <li class="product-details-review-prev" v-for='(review, index) in artwork.reviews' :key='index'>
              <div class="product-details-review-main-header">
                <img class="product-details-img-reviewer" :src='review.by.imgURL' alt='reviewer'>
                <h3 class="product-details-review-fullName">{{review.by.fullName}}</h3>
              </div>
              <h5 class="product-details-review-rate">{{currRate(review.rate)}}</h5>
              <h4 class="product-details-review-txt">{{review.Txt}}</h4>
            </li>
          </ul>
        </div>
          </div>

      <div class="artwork-edit-aside-container">
        <h4>title: </h4>
        <input type="text" v-model="artwork.title" placeholder="change title" />
        <h4>artwork description:</h4>
        <textarea v-model="artwork.desc"></textarea>
        <h4>Price:</h4>
        <input class="num-input" type="number" v-model.number="artwork.price" />
        <h4>currently {{ isInStock }}</h4>
        <button
          class="set-out-stock"
          :class="{ setInStock: artwork.inStock }"
          @click="changeInStock"
        >
          {{ stockBtnMsg }}
        </button>

        <input
        class="url-input"
          type="text"
          placeholder="New image url"
          v-model="NewImgURL"
        /><button @click="onNewMImgURL">
          Save new URL
        </button>
                <button class="set-out-stock" @click="onSave">Save Artwork</button>

      </div>
    </div>
  </section>
</template>

<script>
// import { eventBus } from "../services/event-bus.service.js";

export default {
  name: "artwork-edit",
  data() {
    return {
      currImgIdx: 0,
      NewImgURL: "",
      artwork: null,
      loggedinUser: null
    };
  },
  created() {
    this.loggedinUser = this.$store.getters.loggedinUser;
    const artworkId = this.$route.params.id;
    if (artworkId) {
      this.$store
        .dispatch({
          type: "loadArtwork",
          artworkId
        })
        .then(artwork => {
          this.artwork = JSON.parse(JSON.stringify(artwork));
        });
    }
  },
  computed: {
    stockBtnMsg() {
      return this.artwork.inStock ? "Set as not available" : "Set as available";
    },
    getCurrImg() {
      return this.artwork.imgURLs[this.currImgIdx];
    },
    isInStock() {
      return this.artwork.inStock ? "in stock" : "out of stock";
    },

  },
  methods: {
     currRate(rate){
        switch (rate){
          case 1:
            return '⭐';
          case 2:
            return '⭐⭐';
          case 3:
            return '⭐⭐⭐';
          case 4:
            return '⭐⭐⭐⭐';
          case 5:
            return '⭐⭐⭐⭐⭐';
      }
      return ' ';// here is checking if the rate is 0
    },
    onSave() {
      this.$store
        .dispatch({
          type: "updateArtwork",
          artwork: { ...this.artwork }
        })
        .then(artwork => {
          this.artwork = artwork;
        });
    },
    onRemove() {
      this.artwork.imgURLs.splice([this.currImgIdx], 1);
      this.currImgIdx = 0;
    },
    onGalleryIMGClick(idx) {
      this.currImgIdx = idx;
    },
    onNewMImgURL() {
      this.artwork.imgURLs.push(this.NewImgURL);
      this.NewImgURL = "";
    },
    changeInStock() {
      this.artwork.inStock = !this.artwork.inStock;
    },
    onBack() {
      this.$router.push("/artwork");
    }
  }
};
</script>

<style></style>
