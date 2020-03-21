<template>
  <section class="cart-container">
    <h2>My cart</h2>
    <hr>
    <div v-if="cart" class="cart-main-container">
      <div v-for="(product, index) in cart.cart" :key="index">
      <img class="cart-img-product" :src="product.imgURLs[0]" alt="Product">
      <h2>Price: {{product.price}}</h2>

      </div>
    </div>
    <hr>
  </section>
</template>

<script>

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
      type: "loadcart",
      userId: this.loggedinUser._id
    })
    .then(currCart =>{
      console.log('currCart in cmp: ',currCart);
      this.cart = currCart; 
    })
  },
  methods:{

  }

}
</script>

<style>

</style>
