<template>
  <div>
    <h4 @click="emitFilterType({ artType: '' })">Artwork type</h4>
    <span
      class="side-bar-opt"
      @click="emitFilterType({ artType: 'paintings' })"
    >
      Paintings
    </span>
    <span
      class="side-bar-opt"
      @click="emitFilterType({ artType: 'photography' })"
    >
      photography
    </span>
    <h4 @click="emitFilter({ artGenre: null })">Artwork genre</h4>
    <div
      class="side-bar-opt"
      v-for="(genre, idx) in getGenres"
      @click="emitFilter({ artGenre: genre.name })"
      :key="idx"
    >
        {{ genre.name }}
    </div>
    <h4 @click="emitFilter({ maxPrice: '' })">My budget</h4>
    <input class="range-input"
      type="range"
      min="0"
      max="2500"
      v-on:change="emitMaxPrice"
      v-model="maxPrice"
    />
    <div class="side-bar-range-value">
      {{ this.maxPrice }}<span class="lighter-color"> $</span>
    </div>
    <h4 @click="emitFilter({ tag: '' })">Tags</h4>
    <!-- <div class="side-bar-tag-container"> -->

    <span
      class="side-bar-opt"
      v-for="(tag, idx) in tags"
      @click="$emit('tagClicked', tag)"
      :key="idx"
    >
      # {{ tag }}
    </span>

    <h4 @click="emitFilter({ colorTags: '' })">colors</h4>
    <color-select @emitFilter="emitFilter"></color-select>

    <!-- </div> -->
  </div>
</template>

<script>
import colorSelect from "./color-select.cmp";
export default {
  props: {
    genres: Array,
    tags: Array
  },
  data() {
    return {
      maxPrice: null,
      genresFilter: null
    };
  },
  methods: {
    emitFilterType(readyKey) {
      console.log("emit for colortags,", readyKey);
      this.emitFilter(readyKey);
      this.genresFilter = readyKey.artType;
    },
    emitFilter(radyKey) {
      this.$emit("onFilter", radyKey);
    },
    emitMaxPrice() {
      this.$emit("onFilter", { maxPrice: this.maxPrice });
    }
  },
  computed: {
    getGenres() {
      if (this.genresFilter) {
        return this.genres.filter(genre => {
          return genre.artType == this.genresFilter;
        });
      }
      return this.genres;
    }
  },
  components: {
    colorSelect
  }
};
</script>
