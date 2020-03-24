<template>
  <section class="home-main-layout">
    <!-- <homeHeaderToApp></homeHeaderToApp> -->
    <homeHeader2> </homeHeader2>
    <product-list
      v-for="tag in homeTags"
      :artworks="getArtWorksByTag(tag)"
      :key="tag"
    >
      <h3 class="artwork-list-title">Explore trending streams on  <span class="span"> {{ tag }}</span></h3>
    </product-list>
    <div class="hero-comuunity">
      <h1>hero</h1>
    </div>
    <!-- <home-list> -->
    <!-- </home-list> -->
  </section>
</template>

<script>
import productList from "../components/product-list.cmp";
// import  homeHeaderToApp from "../components/home-header-to-app.cmp";
// import  homeHeaderToApp from "../components/home-header-to-app.cmp";
import homeHeader2 from "../components/home-header2.cmp";
import { eventBus, EVENT_REMOVE } from "../services/event-bus.service.js";

export default {
  name: "home-page",
  components: {
    productList,
    // homeHeaderToApp,
    homeHeader2
  },
  data() {
    return {
      filterBy: { tags: "urban" },
      homeTags: ["nature", "urban", "psychedelic"]
    };
  },
  created() {
    this.$store.dispatch({
      type: "loadArtworks"
    });

    eventBus.$on(EVENT_REMOVE, artworkId => {
      this.removeArtwork(artworkId);
    });
  },
  methods: {
    getArtWorksByTag(tag) {
      let artworks = this.artworks;
      let tagSortedArtworks = artworks.filter(artwork => {
        return artwork.tags.includes(tag);
      });
      return tagSortedArtworks.slice(0, 4);
    }
  },
  computed: {
    artworks() {
      return this.$store.getters.artworks;
    }
  }
};
</script>
