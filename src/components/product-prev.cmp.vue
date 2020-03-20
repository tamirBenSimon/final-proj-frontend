<template>
  <div class="artwork-prev">
    <div class="artwork-prev-img-container">
      <img :src="artwork.imgURLs[0]" alt="" />
    </div>
    <div class="artwork-prev-txt-container">
      <h3>{{ artwork.title }}</h3>
      <span>{{ artwork.desc }}</span> <br />
      <span>price: {{ artwork.price }}</span> <br />
      <span>{{ isInStock }}</span> <br />
    </div>
  </div>
</template>

<script>
export default {
  name: "product-prev",
  props: {
    artwork: Object
  },
  computed: {
    isInStock() {
      return this.artwork.inStock ? "available" : "currently not available";
    }
  }
};
</script>

<style></style>
