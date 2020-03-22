<template>
  <section class="cart-container">
    <img @click="onBack" class="cart-page-img-back" src="../../public/img/icons/left-arrow.png" alt="back">
    <h2>My cart</h2>
    <hr>
    <div class="cart-main-container">
      <div v-if="cart">
        <div class="cart-main" v-for="(product, index) in cart.cart" :key="index">
          <img class="cart-img-product" :src="product.imgURLs[0]" alt="Product">
          <div class="cart-tite">{{product.title}}</div>
          <h2>${{product.price}}</h2>
          <div @click="onRemove(product)" class="cart-remove">Remove</div>
          <div class="cart-buy">Buy Now</div>
        </div>
      </div>
    </div>
    <hr>
  </section>
</template>

<script>
import {eventBus} from '../services/event-bus.service.js'

export default {
  name:'cart-cmp',
  data(){
    return{
      loggedinUser: null,
      cart: null 
    }
  },
  created(){
    this.loggedinUser = this.$store.getters.loggedinUser;
    this.$store.dispatch({
      type: "loadCart",
      userId: this.loggedinUser._id
    })
    .then(currCart =>{
      console.log('currCart in cmp: ',currCart);
      this.cart = currCart; 
    })
  },
  methods:{
    onBack(){
      this.$router.push('/artwork');
    },
    onRemove(product){
      this.$store.dispatch({
      type: "removeCart",
      productId: product._id,
      userId: this.loggedinUser._id
      })
      eventBus.$emit('editCart');
      location.reload();
    }
  }
}
</script>
