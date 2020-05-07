<template>
  <div class="artwork-filter">
    <div class="search-container" :class="{'onFocus':isOnInputFocus}">
      <input
        class="search-input"
        name="mainSearch"
        @focus="inputFocus"
        @hover="inputFocus"
        @blur="outFocus"
        @input="onMainSearch"
        :placeholder="getPlaceHolder"
        type="text"
        v-model="searchParams"
      />

      <div class="search-pad">
        <el-radio-group v-model="searchState">
          <el-radio-button label="artworks"></el-radio-button>
          <el-radio-button label="artists"></el-radio-button>
        </el-radio-group>
        <!-- :class="selected-search-icon"  -->
        <div class="filter-icon-container" @mouseout="outFocus" @mouseover="inputFocus">
          <i class="fas fa-search filter-icon" :class="{'onFocus':isOnInputFocus}"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "product-list",
  data() {
    return {
      isOnInputFocus: false,
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
    inputFocus() {
      this.isOnInputFocus = true;
    },
    outFocus() {
      this.isOnInputFocus = false;
    },
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
