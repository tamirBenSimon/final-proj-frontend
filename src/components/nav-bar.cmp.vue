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
        <div>
          <img @click="onWishList" src="../../public/img/icons/black-like.png" alt="Wish List">
          <div class="nav-bar-num-wish-list" v-if="countWishList">{{countWishList}}</div>
        </div>
        <img src="../../public/img/icons/account.png" alt="User Picture">
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
      countCart: 0,
      countWishList: 0
    }
  },
  created(){
      eventBus.$on('editCart', countOfCart =>{
        console.log('countOfCart',countOfCart );
      this.countCart += countOfCart;
      })
      eventBus.$on('editWishList', countOfWishList =>{
      this.countWishList += countOfWishList;
      })
  },
  methods:{
    onCart(){
      this.$router.push('/cart');
    },
    onLogo(){
      this.$router.push('/artwork');
    },
    onWishList(){
      this.$router.push('/wishList');
    }
  }
}
</script>
