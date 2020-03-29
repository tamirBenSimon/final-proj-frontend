<template>
  <section class="cart-container">
    <img @click="onBack" class="cart-page-img-back" src="../../public/img/icons/left-arrow.png" alt="back" title="Back">
    <h2>My cart</h2>
    <hr>
    <div class="cart-main-container">
      <div v-if="cart">
        <!-- <div class="cart-main" v-for="(product, index) in cart.cart" :key="index"> -->
        <div class="cart-main" v-for="(product, index) in cart" :key="index">  
          <img class="cart-img-product" :src="product.imgURLs[0]" alt="Product">
          <div class="cart-tite">{{product.title}}</div>
          <h2>${{product.price}}</h2>
          <div @click="onRemove(product)" class="cart-remove">Remove</div>
          <div class="cart-buy" @click="placeOrder(product)">Buy Now</div>
        </div>
        <button @click="placeOrders">Buy all</button>
      </div>
    </div>
    <hr>
  </section>
</template>

<script>
// import {eventBus} from '../services/event-bus.service.js'

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
    },
    placeOrders() {
      this.cart.forEach(item => this.placeOrder(item))
    },
    placeOrder(item) {
      console.log('ordering item: ',item)
      const newOrder= {
            at: Date.now(),
            by: {fullName: this.loggedinUser.fullName, _id: this.loggedinUser._id, imgURL: this.loggedinUser.imgURL},
            from: {fullName: item.createdBy.fullName, _id: item.createdBy._id},
            product: {
                _id: item._id,
                title: item.title,
                price: item.price},
            status: 'ordered',
            shippingInfo: {
              lat:32.085300 + Math.random()*10, lng:34.781769+ Math.random()*10
            }}
      this.$store.dispatch({type: "addOrder", order: newOrder})
        // .then(item => this.onRemove(item))
      
    }
  }
}
</script>
