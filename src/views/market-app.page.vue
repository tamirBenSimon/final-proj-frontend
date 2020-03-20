<template>
  <section class="market-app-container">
    <h2>Welcome To Marketplace!</h2>
    <product-list :artworks="artworks" />
  </section>
</template>

<script>
import productList from "../components/product-list.cmp";
import {eventBus, EVENT_REMOVE} from '../services/event-bus.service.js'

export default {
  name: "market-app",
  components: {
    productList
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
    }
  },
  computed: {
    artworks() {
      return this.$store.getters.artworks;
    }
  }
}
</script>
