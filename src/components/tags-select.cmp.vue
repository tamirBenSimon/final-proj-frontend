<template>
  <div class="tag-select">
    <span
      @click="onTagClicked(tag)"
      class="tag-select-span"
      v-for="(tag, idx) in tags"
      :key="idx"
    >
      {{ tag }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    tags: Array
  },
  data() {
    return {};
  },
  methods: {
    onTagClicked(tag) {
      this.$emit("tagClicked", tag);
    }
  }
};
</script>
