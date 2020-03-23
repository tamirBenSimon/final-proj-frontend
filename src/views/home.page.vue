<template>
  <section class="home-main-layout">
    <!-- <homeHeaderToApp></homeHeaderToApp> -->
    <homeHeader2> </homeHeader2>
    <div class="tags-title">
      <h3>Explore trending streams on {{ this.filterBy.tags }}</h3>
    </div>
    <tags-select @tagClicked="tagClicked" :tags="homeTags"> </tags-select>
    <product-list :artworks="artworks" />
    <div class="hero-comuunity">
      <h1>hero</h1>
    </div>
  </section>
</template>

<script>
import productList from "../components/product-list.cmp";
// import  homeHeaderToApp from "../components/home-header-to-app.cmp";
import tagsSelect from "../components/tags-select.cmp";
import homeHeader2 from "../components/home-header2.cmp";
import { eventBus, EVENT_REMOVE } from "../services/event-bus.service.js";

export default {
  name: "home-page",
  components: {
    productList,
    // homeHeaderToApp,
    homeHeader2,
    tagsSelect
  },
  data() {
    return {
      filterBy: { tags: "urban" },
      homeTags: ["nature", "urban", "psychedelic", "art", "exhibit", "go"]
    };
  },
  created() {
    this.$store.dispatch({
      type: "loadArtworks",
      filterBy: { tags: this.filterBy.tags }
    });

    eventBus.$on(EVENT_REMOVE, artworkId => {
      this.removeArtwork(artworkId);
    });
  },
  methods: {
    tagClicked(tag) {
      this.filterBy.tags=tag
      this.$store.dispatch({
        type: "loadArtworks",
        filterBy: { tags: this.filterBy.tags }
      });
    }
  },
  computed: {
    artworks() {
      return this.$store.getters.artworks;
    }
  }
};
</script>
