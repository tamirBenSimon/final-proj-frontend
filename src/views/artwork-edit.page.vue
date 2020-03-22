<template>
  <section class="artwork-edit-container-all">
    <img
      @click="onBack"
      class="artwork-edit-img-back"
      src="../../public/img/icons/left-arrow.png"
      alt="back"
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
        <button @click="onRemove">delete</button>
        <button @click="onSave">Save Artwork</button>
        <div class="artwork-edit-container-reviews">
          <h2>reviews:</h2>
          <ul>
            <li v-for="(review, index) in artwork.reviews" :key="index">
              <img
                class="artwork-edit-img-reviewer"
                :src="review.by.imgURL"
                alt="reviewer"
              />
              <h3>{{ review.by.fullName }}</h3>
              <h4>{{ review.Txt }}</h4>
              <h5>{{ currRate }}</h5>
            </li>
          </ul>
        </div>
      </div>

      <div class="artwork-edit-aside-container">
        <h4>title: {{ artwork.title }}</h4>
        <p>change title:</p>
        <input type="text" v-model="artwork.title" placeholder="change title" />
        <h4>description: {{ artwork.desc }}</h4>
        <p>change description:</p>
        <textarea
          style="max-width:50ch; max-height:12ch;"
          v-model="artwork.desc"
          name=""
          id=""
        ></textarea>
        <h4>Price: {{ artwork.price }}</h4>
        <p>New price:</p>
        <input type="number" v-model.number="artwork.price" />
        <h4>currently {{ isInStock }}</h4>
        <button @click="changeInStock">in Stock</button>
        <p>New price:</p>
        <input type="number" v-model.number="artwork.price" />
        <input type="text" v-model="NewImgURL" /><button @click="onNewMImgURL">
          Save new URL
        </button>
        {{ NewImgURL }}
        <pre
          >{{ artwork }}
        </pre>
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
    getCurrImg(){
      return this.artwork.imgURLs[this.currImgIdx];
    },
    isInStock() {
      return this.artwork.inStock ? "in stock" : "out of stock";
    },
    currRate() {
      var i = 0;
      const rate = this.artwork.reviews[i].rate;
      i++;
      switch (rate) {
        case 1:
          return "⭐";
        case 2:
          return "⭐⭐";
        case 3:
          return "⭐⭐⭐";
        case 4:
          return "⭐⭐⭐⭐";
        case 5:
          return "⭐⭐⭐⭐⭐";
      }
      return " "; // here is checking if the rate is 0
    }
  },
  methods: {
    onSave(){
      this.$store.dispatch({
      type: "updateArtwork",
      artwork:{...this.artwork}
    })
    .then(artwork=>{this.artwork=artwork})
},
    onRemove(){
      this.artwork.imgURLs.splice([this.currImgIdx],1)
      this.currImgIdx=0;
    },
    onGalleryIMGClick(idx){
      this.currImgIdx=idx;
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
    },
  }
};
</script>

<style></style>
