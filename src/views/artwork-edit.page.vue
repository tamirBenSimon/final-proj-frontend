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
              alt="Artwork Image"
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
          </div>
        </div>
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
          <button class="edit-form-input save-artwork" @click="onSave">
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
        };
      });
      return item;
    },
    stockBtnMsg() {
      return this.artwork.inStock ? "Set as not available" : "Set as available";
    },
    getCurrImg() {
      return this.artwork.imgURLs[this.currImgIdx];
    },
    isInStock() {
      return this.artwork.inStock ? "in stock" : "out of stock";
    }
  },
  methods: {
    async uploadImg(event) {
      const fileObject = await cloudinaryService.uploadImg(event);
      const newImgURL = fileObject.url;
      this.artwork.imgURLs.push(newImgURL);
      this.onSave();
    },
    imageList(imgURLs) {
      let items = imgURLs.map(imgURL => {
        return {
          src: imgURL,
          thumbnail: imgURL,
          alt: imgURL,
          w: 600,
          h: 400
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
        this.$router.push("/artwork");
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
}
</script>
