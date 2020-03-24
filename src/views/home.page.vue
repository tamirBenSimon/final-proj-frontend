<template>
  <section class="home-main-layout">
    <!-- <homeHeaderToApp></homeHeaderToApp> -->
    <headerVid> </headerVid>
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
  </section>
</template>

<script>
import productList from "../components/product-list.cmp";
import headerVid from "../components/home-header2.cmp";
import { eventBus, EVENT_REMOVE } from "../services/event-bus.service.js";

export default {
    data() {
    return {
      filterBy: { tags: "urban" },
      homeTags: ["nature", "urban", "psychedelic"]
    };
  },
  name: "home-page",
  created() {
    this.$store.dispatch({
      type: "loadArtworks"
    });

  },
  methods: {
        getArtWorksByTag(tag) {
      let artworks = this.artworks;
      let tagSortedArtworks = artworks.filter(artwork => {
        return artwork.tags.includes(tag);
      });
      return tagSortedArtworks.slice(0, 4);
    },

  },
  computed: {
    artworks() {
      return this.$store.getters.artworks;
    }
  },
  components: {
    productList,
    headerVid
  }
};
</script>
