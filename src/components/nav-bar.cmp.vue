<template>
  <div class="navbar-container">

    <div class="navbar-container-main">
        <img @click="onLogo" class="nav-bar-logo" src="../../public/img/icons/proj_logo.png" alt="Logo" title="Home Page"> 
        <div class="nav-bar-input">
            <input class="navbar-input-inside" type="text" placeholder="Search">
            <img class="nav-bar-search-img" src="../../public/img/icons/search.png" alt="Search">   
        </div> 
    </div>

    <div class="nav-bar-3buttons">
        <div class="nav-bar-wishlist-container">
          <img @click="onwishlist" src="../../public/img/icons/black-like.png" alt="Wish List" title="Wish List">
          <div class="nav-bar-num-wish-list" v-if="countwishlist">{{countwishlist}}</div>
        </div>

        <div class="nav-bar-line"></div>

        <div class="nav-bar-cart-container">
          <img @click="onCart" src="../../public/img/icons/cart.png" alt="Cart" title="Cart">
          <div class="nav-bar-num-cart" v-if="countCart">{{countCart}}</div>
        </div>
        
        <div class="nav-bar-line"></div>
           
        <div class="dropdown">
          <img class="dropbtn" src="../../public/img/icons/account.png" alt="User Picture">
            <div class="dropdown-content">
              <a href="#/">Home Page</a>
              <a href="/#/cabinet">Profile</a>
              <a v-if="!isLoggedinUser" href="/#/login">Login</a>
              <a v-if="!isLoggedinUser" href="/#/signup">Sign Up</a>
              <a v-if="isLoggedinUser" href="#" @click="onLogOut">Log Out</a>
            </div>
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
      countwishlist: 0,
      isLoggedinUser: null
    }
  },
  created(){
    const loggedinUser = this.$store.getters.loggedinUser;
    this.isLoggedinUser = loggedinUser;
    
    const counterWL = this.$store.getters.WL_Counter;
    this.countwishlist = counterWL;

    const counterCart = this.$store.getters.cartCounter;
    this.countCart = counterCart;
    
      eventBus.$on('editCart', () =>{
        const counterCart = this.$store.getters.cartCounter;
        this.countCart = counterCart;
      })
      // eventBus.$on('editwishlist', () =>{
      //   const counterWL = this.$store.getters.WL_Counter;
      //   this.countwishlist = counterWL;
      // })
  },
  methods:{
    signup(){
      this.$router.push('/signup');
    },
    onCart(){
      this.$router.push('/cart');
    },
    onLogo(){
      this.$router.push('/');
    },
    onwishlist(){
      this.$router.push('/wishlist');
    },
    onLogOut(){
      this.$store.dispatch({
          type: 'logout',
      });
      this.isLoggedinUser = null;
      this.$router.push('/');
    }
  }
}
</script>
