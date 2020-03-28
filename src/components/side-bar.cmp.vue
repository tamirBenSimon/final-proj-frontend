<template>
<div>
<h4  @click="emitFilter({artType:''})">artwork type </h4>
        <div @click="emitFilter({artType:'paintings'})">Paintings</div>
        <div @click="emitFilter({artType:'photography'})">photography</div>
        <div v-for="(genre,idx) in genres" :key="idx" > {{genre.name}} </div>

<h4>artwork genre</h4>
<span>Photography</span>
</div>
  
</template>

<script>
export default {
  props: {
    genres: Array
  },
  methods: {
    emitFilter(radyKey){
      this.$emit("onFilter", radyKey);
    }
  }
};
</script>
