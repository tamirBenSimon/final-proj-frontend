<template>
    <div class="artwork-filter">
      <input @input="onFilter" placeholder="Search Artwork" type="text" v-model="filterBy.title" />
      <input class="num-input" placeholder="Start at" type="number" v-model.number="filterBy.minPrice" />
      <input class="num-input" placeholder="Mac price" type="number" v-model.number="filterBy.maxPrice" />
      <input type="text" placeholder="Search by tags" v-model="filterBy.tags" />
      <input type="text"  v-model="filterBy.creatorName" placeholder="artiist name" />
      <button @click.prevent="onFilter">filter</button>
    </div>
</template>
<script>
export default {
  name: "product-list",
  data() {
    return {
      filterBy: {
        title: "",
        minPrice: null,
        maxPrice: null,
        tags: "",
        creatorName:null
      }
    };
  },
  methods: {
    onFilter() {
      this.$emit("onFilter", { ...this.filterBy });
    }
  }
};
</script>
