<template>
    <div class="color-select-container">
      <div class="color-select"
      
      v-for="(color,idx) in colors"
      @click="onFilter(color)"
      :style=" {'background-color' : color}"
      :key="idx"
      > 

      </div>
    </div>
</template>
<script>
export default {
  name: "color-select",
  data() {
    return {
      colors:['#FBF3B5','#DCC513', '#CA533C', '#A32007','#A32007','#9AF655','#64A1F5','#75325C','#75325C','#F7EBC6', '#e9fb23' ]
    };
  },
  methods: {
    onFilter(colorTag) {
      this.$emit("emitFilter", {colorTags:colorTag} );
    }
  }
};
</script>
