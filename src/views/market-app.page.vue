<template>
  <section class="market-app-container">
    <header class="main-header" id="nav">
      </header>
    <artwork-filter @onFilter="onFilter" />
    <product-list :artworks="artworks" />
  </section>
</template>

<script>
import productList from "../components/product-list.cmp";
import artworkFilter from "../components/artwork-filter.cmp";
import {eventBus, EVENT_REMOVE} from '../services/event-bus.service.js'

export default {
  name: "market-app",
  components: {
    productList,
    artworkFilter
  },
  created() {
    this.$store.dispatch({
      type: "loadArtworks"
    });

    eventBus.$on(EVENT_REMOVE,(artworkId)=>{
      this.removeArtwork(artworkId)})
  },
  methods:{
        removeArtwork (artworkId){
      this.$store.dispatch({
      type: "removeArtwork",
      artworkId
    });
    },
    onFilter(filterBy){
            this.$store.dispatch({
      type: "loadArtworks",
      filterBy
    });
    }
  },
  computed: {
    artworks() {
      return this.$store.getters.artworks;
    }
  }
}
</script>
