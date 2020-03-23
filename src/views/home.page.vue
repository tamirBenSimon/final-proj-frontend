<template>
  <section class="home-main-layout">
    <!-- <homeHeaderToApp></homeHeaderToApp> -->
    <homeHeader2> </homeHeader2>
    <div class="tags-title">
      <h3>Explore trending streams on {{ this.filterBy.tags }}</h3>
    </div>
    <tags-select @tagClicked="tagClicked" :tags="homeTags"> </tags-select>
    <product-list   v-for="tag in homeTags" :artworks="getArtWorksByTag(tag)" :key="tag" >
            <h3>Explore trending streams on {{tag}}</h3>

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
    },
    getArtWorksByTag(tag){
      console.log('soRTING!!! ', tag)
      let artworks=this.artworks
      let tagSortedArtworks= artworks.filter(artwork=>{
        return artwork.tags.includes(tag)
      })
      return tagSortedArtworks
    }
  },
  computed: {
    artworks() {
      return this.$store.getters.artworks;
    }
  }


};
</script>
