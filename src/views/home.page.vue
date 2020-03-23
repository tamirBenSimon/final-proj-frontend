<template>
  <section class="home-main-layout">
    <!-- <homeHeaderToApp></homeHeaderToApp> -->
     <homeHeader2>
    </homeHeader2> 
    <tags-select @tagClicked="tagClicked" :tags="homeTags"> </tags-select>
    <product-list :artworks="artworks" />
  </section>
</template>

<script>
import productList from "../components/product-list.cmp";
// import  homeHeaderToApp from "../components/home-header-to-app.cmp";
import  tagsSelect  from "../components/tags-select.cmp";
import  homeHeader2 from "../components/home-header2.cmp";
import {eventBus, EVENT_REMOVE} from '../services/event-bus.service.js';

export default {
  name: "home-page",
  components: {
    productList,
    // homeHeaderToApp,
    homeHeader2,
    tagsSelect
  },
  data(){
    return{
      homeTags:["nature", "urban", "psychedelic", "art", "exhibit","go"]
    }
  },
  created() {
    this.$store.dispatch({
      type: "loadArtworks",
      filterBy:{tags:'urban'}
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

    tagClicked(tag){
      console.log(tag)
            this.$store.dispatch({
      type: "loadArtworks",
      filterBy:{tags: tag}
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
