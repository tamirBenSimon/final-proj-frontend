<template>
  <section >
    <h2>list:</h2>
    <div class="artwork-prevs-container">
    <productPrev v-for="artwork in artworks" :key="artwork._id" :artwork="artwork" />
    </div>
  </section>
</template>

<script>
import productPrev from "./product-prev.cmp";

export default {
  name: "product-list",
  components: {
    productPrev
  },
  props: {
    artworks: Array
  }
};
</script>
