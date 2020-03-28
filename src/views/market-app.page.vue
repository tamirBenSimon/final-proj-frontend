<template>
  <section class="market-app-container">
    <tags-select @tagClicked="tagClicked" :tags="homeTags"> </tags-select>
    <artwork-filter @onFilter="onFilter" />
    <div class="app-main-container">
<side-bar :genres="getGenres" @onFilter="onFilter"></side-bar>
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
      genres:[
        {
          artType:'paintings',
          name: 'canvas'
        },
        
                {
          artType:'photography',
          name: 'docu'
        },
                {
          artType:'paintings',
          name: 'geometry'
        },
                        {
          artType:'photography',
          name: 'Wild life'
        },
                        {
          artType:'paintings',
          name: 'fine art'
        },
      ],
      filterBy: {},
      homeTags: ["nature", "urban", "psychedelic", "art", "exhibit", "go"]
    };
  },
  created() { 
    console.log("createddddd")
       let params= this.getParams;
      //  this.filterBy={...params}
       for(let key in params){
        this.filterBy[key]= params[key]
       }
    this.$store.dispatch({
      type: "loadArtworks",
      filterBy: this.filterBy
    });

    eventBus.$on(EVENT_REMOVE,(artworkId)=>{
      this.removeArtwork(artworkId)});
      
      eventBus.$on('addWishlist', (userId, product) =>{
        console.log('i was dispatched from market app!')
        this.$store.dispatch({
          type: 'addToWishlist',
          userId: userId, 
          product: product 
        })
      })
        // eventBus.$emit('editWishlist');
  },
  beforeDestroy(){
    eventBus.$off()
  },
  computed: {
    getGenres(){
      console.log("getting genres")
      return this.filterBy.artType? (this.genres):(this.genres.map(genre=>{return genre.artType==this.filterBy.artType}))
    },
    artworks() {
      return this.$store.getters.artworks;
    },
    getParams(){
      return this.$route.params;
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
      console.log('onFILTER')
      for(let key in filterBy){
        this.filterBy[key]= filterBy[key]
        console.log(key)
      }
      this.$store.dispatch({
        type: "loadArtworks",
        filterBy: this.filterBy
      });
    }
  }
};
</script>
