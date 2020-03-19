<template>
  <div class="artwork-card">
    <div class="prev-img-container">
      <img :src="artwork.imgURLs[0]" alt="">
    </div>
    <h3>{{artwork.title}}</h3>
    <span>{{artwork.desc}}</span> <br>
    <span>price: {{artwork.price}}</span> <br>
    <span>{{isInStock}}</span> <br>
    <hr>
    <h2>
      </h2>
    <span>{{}}</span> <br>

    
    <hr>
    <pre>
      {{artwork}}
    </pre>
  </div>
</template>

<script>
export default {
  name: 'product-prev',
   props:{
     artwork: Object
   },
   computed:{
     isInStock(){
       return this.artwork.inStock? 'available': 'currently not available'
     }
   }
  
}
</script>

<style>

</style>
