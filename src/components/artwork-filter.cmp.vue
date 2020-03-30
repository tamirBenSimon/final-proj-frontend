<template>
  <div class="artwork-filter">
    <div class="search-container">
      <input
        class="search-input"
        @input="onMainSearch"
        :placeholder="getPlaceHolder"
        type="text"
        v-model="searchParams"
      />
      <el-radio-group v-model="searchState">
        <el-radio-button label="artworks"></el-radio-button>
        <el-radio-button label="artists"></el-radio-button>
      </el-radio-group>
    </div>
    <el-input-number
      label="Min price"
      class="num-input"
      size="small"
      v-model="filterBy.minPrice"
      :step="2"
    ></el-input-number>

    <input class="num-input" type="number" v-model.number="filterBy.minPrice" />
    <input
      class="num-input"
      placeholder="Max price"
      type="number"
      v-model.number="filterBy.maxPrice"
    />
    <button @click.prevent="onFilter">filter</button>
  </div>
</template>
<script>
export default {
  name: "product-list",
  data() {
    return {
      searchState: "artwork",
      searchParams: "",
      filterBy: {
        title: "",
        minPrice: null,
        maxPrice: null,
        tag: "",
        creatorName: null
      }
    };
  },
  methods: {
    onFilter() {
      this.$emit("onFilter", { ...this.filterBy });
    },
    onMainSearch() {
      if (this.searchState === "artists") {
        this.filterBy.creatorName = this.searchParams;
        this.filterBy.title = "";
        this.onFilter();
      } else {
        this.filterBy.title = this.searchParams;
        this.filterBy.creatorName = "";
        this.onFilter();
      }
    }
  },
  computed: {
    getPlaceHolder() {
      return this.searchState === "artists"
        ? "Search artists"
        : "Search artworks";
    }
  }
};
</script>
