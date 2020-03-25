<template>
  <section class="wish-list-container">
    <h2>My Wish List</h2>
    <hr>
    <div class="wish-list-main-container">
      <div v-if="wishlist">
        <div class="wish-list-main" v-for="(product, index) in wishlist[0].wishlist" :key="index">
          <img class="wish-list-img-product" :src="product.imgURLs[0]" alt="Product">
          <div class="wish-list-tite">{{product.title}}</div>
          <h2>${{product.price}}</h2>
          <div @click="onRemove(product)" class="wish-list-remove">Remove</div>
          <div class="wish-list-buy">Buy Now</div>
        </div>
      </div>
    </div>
    <hr>
  </section>
</template>   

<script>
import {eventBus} from '../services/event-bus.service.js'

export default {
  name:'wish-list-cmp',
  data(){
    return{
      loggedinUser: null,
      wishlist: null 
    }
  },
  created(){
    this.loggedinUser = this.$store.getters.loggedinUser;
    // if(!this.loggedinUser) this.loggedinUser._id = 1234321;
    this.$store.dispatch({
      type: "loadWishList",
      userId: this.loggedinUser._id
    })
    .then(currwishlist =>{
      console.log('currwishlist in cmp: ',currwishlist);
      this.wishlist = currwishlist; 
    })
  },
  methods:{
      onRemove(product){
      this.$store.dispatch({
      type: "removewishList",
      wishlist: product._id,
      userId: this.loggedinUser._id
      })
      // const counterWL = this.$store.getters.WL_Counter;
      eventBus.$emit('editwishlist');
      // location.reload();
    }
  }
}
</script>