<template>
  <section class="wish-list-container">
    <h2>My Wish List</h2>
    <hr>
    <div class="wish-list-main-container">
      <div v-if="wishList" >
        <div class="wish-list-main" v-for="(product, index) in wishList.wishList" :key="index">
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
      wishList: null 
    }
  },
  created(){
    this.loggedinUser = this.$store.getters.loggedinUser;
    this.$store.dispatch({
      type: "loadWishList",
      userId: this.loggedinUser._id
    })
    .then(currwishList =>{
      console.log('currwishList in cmp: ',currwishList);
      this.wishList = currwishList; 
    })
  },
  methods:{
      onRemove(product){
      this.$store.dispatch({
      type: "removeWishList",
      productId: product._id,
      userId: this.loggedinUser._id
      })
      // const counterWL = this.$store.getters.WL_Counter;
      eventBus.$emit('editWishList');
      location.reload();
    }
  }
}
</script>