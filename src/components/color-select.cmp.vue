<template>
  <div class="color-select-container">
    <div
      class="color-select"
      v-for="(color,idx) in colors"
      @click="onFilter(color)"
      :style=" {'background-color' : color}"
      :key="idx"
    ></div>
  </div>
</template>

<script>
export default {
  name: "color-select",
  data() {
    return {
      colors: ["blue", "red", "yellow", "black", "brown", "white", "#e9fb23"]
    };
  },
  methods: {
    onFilter(colorTag) {
      this.$emit("emitFilter", { colorTags: colorTag });
    }
  }
};
</script>
