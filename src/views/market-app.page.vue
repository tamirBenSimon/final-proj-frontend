<template>
  <section class="market-app-container">
    <tags-select @tagClicked="tagClicked" :tags="homeTags"> </tags-select>
    <artwork-filter @onFilter="onFilter" />
    <product-list class="artwork-list-market-app" :artworks="artworks" />
  </section>
</template>

<script>
import tagsSelect from "../components/tags-select.cmp";
import productList from "../components/product-list.cmp";
import artworkFilter from "../components/artwork-filter.cmp";
import { eventBus, EVENT_REMOVE } from "../services/event-bus.service.js";

export default {
  name: "market-app",
  components: {
    productList,
    artworkFilter,
    tagsSelect
  },
  data() {
    return {
      filterBy: {},
      homeTags: ["nature", "urban", "psychedelic", "art", "exhibit", "go"]
    };
  },
  created() {
    this.$store.dispatch({
      type: "loadArtworks"
    });

    eventBus.$on(EVENT_REMOVE,(artworkId)=>{
      this.removeArtwork(artworkId)});
      
      eventBus.$on('addWishlist', (userId, product) =>{
        this.$store.dispatch({
          type: 'addToWishlist',
          userId: userId, 
          product: product 
        })
      })
        eventBus.$emit('editWishlist');
  },
  computed: {
    artworks() {
      return this.$store.getters.artworks;
    }
  },
  methods: {
    tagClicked(tag) {
      this.filterBy.tags = tag;
      this.$store.dispatch({
        type: "loadArtworks",
        filterBy: { tag }
      });
    },
    removeArtwork(artworkId) {
      this.$store.dispatch({
        type: "removeArtwork",
        artworkId
      });
    },
    onFilter(filterBy) {
      this.$store.dispatch({
        type: "loadArtworks",
        filterBy
      });
    }
  }
};
</script>
