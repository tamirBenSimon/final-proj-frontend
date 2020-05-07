<template>
  <section class="market-app-container">
    <div class="market-app-tags-btn btn" @click="toggletags">{{moodOfSideBar}}</div>
    <tags-select @tagClicked="tagClicked" :tags="homeTags"></tags-select>
    <artwork-filter @onFilter="onFilter" />
    <div class="app-main-container">
      <div class="side-bar-range-value"></div>
      <side-bar
        class="market-side-bar"
        :tags="getHomeTags"
        @tagClicked="tagClicked"
        :genres="getGenres"
        @onFilter="onFilter"
      ></side-bar>
      <product-list class="artwork-list-market-app" :artworks="artworks" />
    </div>
  </section>
</template>

<script>
import tagsSelect from "../components/tags-select.cmp";
import sideBar from "../components/side-bar.cmp";
import productList from "../components/product-list.cmp";
import artworkFilter from "../components/artwork-filter.cmp";
import { eventBus, EVENT_REMOVE } from "../services/event-bus.service.js";

export default {
  name: "market-app",
  components: {
    productList,
    artworkFilter,
    tagsSelect,
    sideBar
  },
  data() {
    return {
      genres: [
        {
          artType: "paintings",
          name: "canvas"
        },

        {
          artType: "photography",
          name: "docu"
        },
        {
          artType: "paintings",
          name: "geometry"
        },
        {
          artType: "photography",
          name: "Wild life"
        },
        {
          artType: "paintings",
          name: "fine art"
        }
      ],
      filterBy: {},
      homeTags: [
        "nature",
        "urban",
        "psychedelic",
        "fantasy",
        "anime",
        "creature",
        "negative",
        "cat",
        "animal",
        "clipart",
        "scream",
        "tribute"
      ],
      isOpenBar: false
    };
  },
  created() {
    let params = this.getParams;
    for (let key in params) {
      this.filterBy[key] = params[key];
    }
    this.$store.dispatch({
      type: "loadArtworks",
      filterBy: this.filterBy
    });

    eventBus.$on(EVENT_REMOVE, artworkId => {
      this.removeArtwork(artworkId);
    });

    eventBus.$on("addWishlist", (userId, product) => {
      this.$store.dispatch({
        type: "addToWishlist",
        userId: userId,
        product: product
      });
    });
  },
  beforeDestroy() {
    eventBus.$off();
  },
  computed: {
    getHomeTags() {
      return this.homeTags.slice(2, 8);
    },
    getGenres() {
      return this.genres;
    },
    getFilterBy() {
      return this.filterBy;
    },

    artworks() {
      return this.$store.getters.artworks;
    },
    getParams() {
      return this.$route.params;
    },
    moodOfSideBar() {
      if (this.isOpenBar) return "Close Side Bar";
      return "Open Tags Filter";
    }
  },
  methods: {
    tagClicked(tag) {
      this.filterBy.tag = tag;
      this.$store.dispatch({
        type: "loadArtworks",
        filterBy: this.filterBy
      });
    },
    removeArtwork(artworkId) {
      this.$store.dispatch({
        type: "removeArtwork",
        artworkId
      });
    },
    onFilter(filterBy) {
      for (let key in filterBy) {
        this.filterBy[key] = filterBy[key];
      }
      this.$store.dispatch({
        type: "loadArtworks",
        filterBy: this.filterBy
      });
    },
    toggletags() {
      this.isOpenBar = !this.isOpenBar;
      document.body.classList.toggle("menu-tags-open");
    }
  }
};
</script>
