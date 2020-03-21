<template>
  <div class="navbar-container">
    <div class="navbar-container-main">
        <img @click="onLogo" class="nav-bar-logo" src="../../public/img/icons/facebook.png" alt="Logo"> 
        <div class="nav-bar-input">
            <input class="navbar-input-inside" type="text" placeholder="Search">
            <img class="nav-bar-search-img" src="../../public/img/icons/search.png" alt="Search">   
        </div> 
    </div>
    <div class="nav-bar-3buttons">
        <img src="../../public/img/icons/black-like.png" alt="Wish List">
        <img src="../../public/img/icons/github.png" alt="User Picture">
        <div class="nav-bar-cart-container">
          <img @click="onCart" src="../../public/img/icons/cart.png" alt="Cart">
          <div class="nav-bar-num-cart" v-if="countCart">{{countCart}}</div>
        </div>
    </div>
  </div>
</template>

<script>
import {eventBus} from '../services/event-bus.service.js'

export default {
  data(){
    return{
      countCart:0
    }
  },
  created(){
      eventBus.$on('addCart', countOfCart =>{
      this.countCart += countOfCart;
      })
  },
  methods:{
    onCart(){
      this.$router.push('/cart');
    },
    onLogo(){
      this.$router.push('/artwork');
    }
  }

}
</script>

<style scoped>

</style>
