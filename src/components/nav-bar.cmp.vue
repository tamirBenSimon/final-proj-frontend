<template>
  <div class="navbar-container">

    <div class="navbar-container-main">
        <img @click="onLogo" class="nav-bar-logo" src="../../public/img/icons/royal-logo.png" alt="Logo" title="Home Page"> 
        <div class="nav-bar-input">
            <input class="navbar-input-inside" type="text" placeholder="Search">
            <img class="nav-bar-search-img" src="../../public/img/icons/search.png" alt="Search">   
        </div> 
    </div>

    <div class="nav-bar-3buttons">
        <div class="nav-bar-wishlist-container">
          <img @click="onwishlist" src="../../public/img/icons/black-like.png" alt="Wish List" title="Wish List">
          <div class="nav-bar-num-wish-list flex-center" v-if="WL_count">{{WL_count}}</div>
        </div>

        <div class="nav-bar-line"></div>

        <div class="nav-bar-cart-container">
          <img @click="onCart" src="../../public/img/icons/cart.png" alt="Cart" title="Cart">
          <div class="nav-bar-num-cart flex-center" v-if="cart_count">{{cart_count}}</div>
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

export default {
  data(){
    return{
      isLoggedinUser: null
    }
  },
  created(){
    const loggedinUser = this.$store.getters.loggedinUser;
    this.isLoggedinUser = loggedinUser;
  },
  computed:{
    WL_count(){
      return this.$store.getters.WL_Counter;
    },
    cart_count(){
      return this.$store.getters.cartCounter;
    }
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
