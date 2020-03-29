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
            <vue-picture-swipe
              class="artwork-edit-img-artwork"
              :items="getCurrImgItem"
            ></vue-picture-swipe>

            <button class="set-out-stock setInStock" @click="onRemove">
              delete
            </button>
            <!-- <vue-picture-swipe :items="getCurrImgItem"></vue-picture-swipe> -->
            <!-- 
            <vue-flux
              :options="fluxOptions"
              :images="fluxImages"
              :transitions="fluxTransitions"
              ref="slider"
            >
            </vue-flux> -->
            <!-- <button @click="$refs.slider.showImage('next')">NEXT</button> -->
          </div>
        </div>

        <!-- <div class="product-details-container-reviews">
          <h2>Reviews:</h2>
          <ul class="product-details-reviews-list">
            <li
              class="product-details-review-prev"
              v-for="(review, index) in artwork.reviews"
              :key="index"
            >
              <div class="product-details-review-main-header">
                <img
                  class="product-details-img-reviewer"
                  :src="review.by.imgURL"
                  alt="reviewer"
                />
                <h3 class="product-details-review-fullName">
                  {{ review.by.fullName }}
                </h3>
              </div>
              <h5 class="product-details-review-rate">
                {{ currRate(review.rate) }}
              </h5>
              <h4 class="product-details-review-txt">{{ review.Txt }}</h4>
            </li>
          </ul>
        </div> -->
      </div>

      <div class="artwork-edit-aside-container">
        <div class="artwoek-edit-form">
          <h4 class="artwork-edit-form-title">Title</h4>
          <input
            type="text"
            v-model="artwork.title"
            placeholder="change title"
          />
          <h4>Artwork description</h4>
          <textarea v-model="artwork.desc"></textarea>
          <h4>Price</h4>
          <input
            class="num-input"
            type="number"
            v-model.number="artwork.price"
          />
          <h4>Stock status</h4>
          currently {{ isInStock }}
          <button
            class=" file-input set-out-stock"
            :class="{ setInStock: artwork.inStock }"
            @click="changeInStock"
          >
            {{ stockBtnMsg }}
          </button>

          <h4>
            Upload new image
          </h4>
          <label class="edit-form-input" name="file-input-upload" for="files"
            >Upload from local files</label
          >
          <input
            @change="uploadImg"
            id="files"
            name="file-input-upload"
            style="display: none;"
            type="file"
          />
          <span>Or</span>
          <input
            type="text"
            v-model="NewImgURL"
            placeholder="type here new image url and hit Save"
          />

          <button class="edit-form-input btn" @click="onNewMImgURL">
            Save new URL
          </button>
          <button class=" edit-form-input save-artwork" @click="onSave">
            Save changes to artwork
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import VuePictureSwipe from "vue-picture-swipe";
import { cloudinaryService } from "../services/cloudinary.service.js";
// import { eventBus } from "../services/event-bus.service.js";
// import { CldImage } from "cloudinary-vue";
// import { VueFlux, Transitions } from "vue-flux";
// import "vue-flux/dist-ssr/_vue-flux.css";
//more to import from cloudinary: CldContext, CldVideo,CldTransformation,CldPoster

export default {
  name: "artwork-edit",
  data() {
    return {
      currImgIdx: 0,
      NewImgURL: "",
      artwork: null,
      loggedinUser: null,
      items: []
    };
  },
  components: {
    VuePictureSwipe
    // CldImage
    // 'vue-flux': VueFlux
  },
  created() {
    console.log("artwork Id in created Time ", artworkId);
    this.loggedinUser = this.$store.getters.loggedinUser;
    const artworkId = this.$route.params.id;
    if (artworkId) {
      this.$store
        .dispatch({
          type: "loadArtwork",
          artworkId
        })
        .then(resArtwork => {
          this.artwork = JSON.parse(JSON.stringify(resArtwork));
          this.imageList(resArtwork.imgURLs);
        });
    } else {
      this.artwork = {
        title: "",
        desc: "",
        price: null,
        inStock: true,
        size: { w: "920", h: "600" },
        SaleInfo: { inSale: false, salePrice: null },
        artType: null,
        artGenre: null,
        createdAt: 1585216150222,
        shippingInfo: { lat: 41.8779788465189, lng: 44.3249329384843 },
        colorTags: [],
        createdBy: {
          _id: this.loggedinUser._id,
          fullName: this.loggedinUser.fullName,
          imgURL: this.loggedinUser.imgURL
        },

        imgURLs: [],
        tags: [],
        salesCount: 0,
        reviews: []
      };
      console.log(this.artwork);
    }
  },
  computed: {
    getCurrImgItem() {
      let imageUrls = [];
      imageUrls.push(this.artwork.imgURLs[this.currImgIdx]);

      let item = imageUrls.map(imgURL => {
        return {
          src: imgURL,
          thumbnail: imgURL,
          alt: imgURL,
          w: 1090,
          h: 720
          // style: {'object-fit': 'contain'}
        };
      });
      return item;
    },
    stockBtnMsg() {
      return this.artwork.inStock ? "Set as not available" : "Set as available";
    },
    getCurrImg() {
      console.log(this.artwork.imgURLs[this.currImgIdx]);
      return this.artwork.imgURLs[this.currImgIdx];
    },
    isInStock() {
      return this.artwork.inStock ? "in stock" : "out of stock";
    }
  },
  methods: {
    async uploadImg(event) {
      console.log(event.target.files[0]);
      const fileObject = await cloudinaryService.uploadImg(event);
      const newImgURL = fileObject.url;
      this.artwork.imgURLs.push(newImgURL);
      console.log(" now i am url like thissssss: ", this.artwork.imgURLs);
      this.onSave();
    },
    imageList(imgURLs) {
      let items = imgURLs.map(imgURL => {
        console.log(imgURL);
        return {
          src: imgURL,
          thumbnail: imgURL,
          alt: imgURL,
          w: 600,
          h: 400
          // style: {'object-fit': 'contain'}
        };
      });

      return (this.items = items);
    },

    onSave() {
      this.$store
        .dispatch({
          type: "updateArtwork",
          artwork: this.artwork
        })
        .then(artwork => {
          this.artwork = artwork;
        });
    },
    onRemove() {
      this.artwork.imgURLs.splice([this.currImgIdx], 1);
      this.currImgIdx = 0;
      this.onSave();
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
