<template>
  <section>
    <slot> </slot>
    <div class="artwork-list-artwork-prevs-container">
      <productPrev
        v-for="artwork in artworks"
        :key="artwork._id"
        :artwork="artwork"
      />
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
