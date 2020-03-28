<template>
  <div>
    <h4 @click="emitFilterType({ artType: '' })">Artwork type</h4>
    <span class="side-bar-opt" @click="emitFilterType({ artType: 'paintings' })">
      Paintings
    </span>
    <span
      class="side-bar-opt"
      @click="emitFilterType({ artType: 'photography' })"
    >
      photography
    </span>
    <h4 @click="emitFilter({ artGenre: null })">Artwork genre</h4>
    <span
      class="side-bar-opt"
      v-for="(genre, idx) in getGenres"
      @click="emitFilter({ artGenre: genre.name })"
      :key="idx"
    >
      {{ genre.name }}
    </span>
        <h4 @click="emitFilterType({ tags: '' })">Tags</h4>
    <div class="side-bar-tag-container">
      <span
        v-for="(tag, idx) in tags"
        @click="$emit('tagClicked', tag)"
        :key="idx"
        >{{ tag }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    genres: Array,
    tags: Array
  },
  data() {
    return {
      genresFilter: null
    };
  },
  methods: {
    emitFilterType(radyKey) {
      this.emitFilter(radyKey);
      this.genresFilter = radyKey.artType;
    },
    emitFilter(radyKey) {
      this.$emit("onFilter", radyKey);
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
  }
};
</script>
