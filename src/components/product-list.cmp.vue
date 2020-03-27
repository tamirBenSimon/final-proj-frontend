<template>
  <section class="artwork-list-main-container">
    <slot> </slot>
    <div class="artwork-list-artwork-prevs-container">
      <productPrev
        v-for="artwork in artworks"
        :key="artwork._id"
        :artwork="artwork"
      />
    </div>
    <div class="artwork-list-more-main">
      <h3 class="artwork-list-more-btn btn">More...</h3>
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
