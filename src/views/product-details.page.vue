<template>
  <section>
    <h1>artwork Detalis</h1>
    <pre v-if="artwork">{{artwork}}</pre>
    
  </section>
</template>

<script>

export default {
  name:'product-details',
  data(){
    return{
      artwork: null
    }
  },
  created(){
     const artworkId = this.$route.params.id;
        if (artworkId) {
            this.$store.dispatch({
                    type: 'loadArtwork',
                    artworkId
                })
                .then(artwork => {
                    this.artwork = JSON.parse(JSON.stringify(artwork))
                })
        }
  },
}
</script>

<style>

</style>