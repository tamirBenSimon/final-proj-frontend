<template>
  <section class='product-details-container-all'>
    <img @click='onBack' class='product-details-img-back' src='../../public/img/icons/left-arrow.png' alt='back' title="Back">
    <div class='product-details-container-main'>
      <div class='product-details-left-side-container'>
        
        <div class='product-details-preview-artwork'>
          <img class='product-details-img-artwork' :src='artwork.imgURLs[0]' alt='artwork'>
          <h4>{{artwork.title}}</h4>
          <h4>{{artwork.desc}}</h4>
        </div>

        <div class='product-details-container-reviews'>
          <h2>reviews:</h2>
          <ul>
            <li v-for='(review, index) in artwork.reviews' :key='index'>
              <img class='product-details-img-reviewer' :src='review.by.imgURL' alt='reviewer'>
              <h3>{{review.by.fullName}}</h3>
              <h4>{{review.Txt}}</h4>
              <h5>{{currRate(review.rate)}}</h5>
            </li>
          </ul>
        </div>
      </div>

      <div class='product-details-aside-container'>
        <h4>Price</h4>
        <h4>${{artwork.price}}</h4>
        <button @click='onBuy'>Buy Now</button>
        <button @click='onCart' >Add To Cart</button>
      </div>
    </div>
  </section>
</template>

<script>
import {eventBus} from '../services/event-bus.service.js'

export default {
  name:'product-details',
  data(){
    return{
      artwork: null,
      loggedinUser: null
    }
  },
  mounted(){
    this.loggedinUser = this.$store.getters.loggedinUser;
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
  methods:{
    onBack(){
      this.$router.push('/artwork');
    },
    onCart(){
      const userId = this.loggedinUser._id;
      const product = this.artwork;
      this.$store.dispatch({
          type: 'addToCart',
          userId: userId, 
          product: product 
      })
       eventBus.$emit('editCart');
        location.reload();
    },
    onBuy(){
      console.log('buying!');
    },
     currRate(rate){
        switch (rate){
          case 1:
            return '⭐';
          case 2:
            return '⭐⭐';
          case 3:
            return '⭐⭐⭐';
          case 4:
            return '⭐⭐⭐⭐';
          case 5:
            return '⭐⭐⭐⭐⭐';
      }
      return ' ';// here is checking if the rate is 0
    }
  }
}
</script>