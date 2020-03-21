<template>
  <router-link class="artwork-prev" :to="'/artwork/' + artwork._id">
    <div class="artwork-prev-img-container">
      <img  :src="Showartwork" alt="" />
      <div class="artwork-prev-txt-container">
        <div class="artwork-prev-txt-header">
          <h3>{{ artwork.title }}</h3>
          <span>{{ artwork.price }}USD</span>
        </div>
        <span class="artwork-prev-createdBy-fullName">
          {{ artwork.createdBy.fullName }}</span
        >
        <!-- <span>{{  artwork.desc }}</span> <br> -->
        <span>{{ isInStock }}</span>
        <div class="artwork-prev-controle-pad">
          <button @click.prevent="remove">remove</button>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import { eventBus, EVENT_REMOVE } from "../services/event-bus.service.js";
export default {
  name: "product-prev",
  props: {
    artwork: Object
  },
  data() {
    return {
      imgUrlIdx: 0
    };
  },
  mounted() {
    setInterval(() => {
      this.imgUrlIdx =
        this.imgUrlIdx === this.artwork.imgURLs.length - 1
          ? 0
          : this.imgUrlIdx + 1;
    }, 7000);
  },
  computed: {
    isInStock() {
      return this.artwork.inStock ? "available" : "currently not available";
    },
    Showartwork() {
      return this.artwork.imgURLs[this.imgUrlIdx];
    }
  },
  methods: {
    remove() {
      eventBus.$emit(EVENT_REMOVE, this.artwork._id);
    }
  }
};
</script>

<style></style>
