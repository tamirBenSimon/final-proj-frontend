<template>
  <div :style="getNavStyle" class="navbar-container ">
    <div class="navbar-container-main">
      <img
        @click="onLogo"
        class="nav-bar-logo btn"
        src="../../public/img/icons/logo4.png"
        alt="Logo"
        title="Gallerior!"
      />
    </div>

    <div class="nav-bar-3buttons">

      <!-- <div class="nav-bar-artwork-cb btn"><img
          @click="onArtwork"
          src="../../public/img/svg/artwork.svg"
          alt="Enter Gallery"
          title="Enter Gallery"
        />
      </div> -->

      <!-- <div class="nav-bar-line"></div> -->

      <div class="nav-bar-wishlist-container">
        <img
          @click="onwishlist"
          src="../../public/img/svg/heart1.svg"
          alt="Wish List"
          title="Wish List"
        />
        <div class="nav-bar-num-wish-list flex-center" v-if="WL_count">
          {{ WL_count }}
        </div>
      </div>

      <div class="nav-bar-line"></div>

      <div class="nav-bar-cart-container">
        <img
          @click="onCart"
          src="../../public/img/svg/cart1.svg"
          alt="Cart"
          title="Cart"
        />
        <div class="nav-bar-num-cart flex-center" v-if="cart_count">
          {{ cart_count }}
        </div>
      </div>

      <div class="nav-bar-line"></div>

      <div class="dropdown">
        <img
          class="dropbtn"
          src="../../public/img/svg/account1.svg"
          alt="User Picture"
        />
        <div class="dropdown-content">
          <a href="#/">Home Page</a>
          <a :href="'/#/cabinet/' + loggedinUser._id">Profile</a>
          <a v-if="!isLoggedinUser" href="/#/login">Login</a>
          <a v-if="isLoggedinUser" href="#" @click="onLogOut">Log Out</a>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "nav-bar",
  data() {
    return {
      navStyle: "background-color:rgba(234, 234, 234,0)",
      // isLoggedinUser: null,
      showNavbar: false,
      lastScrollPosition: 0
    };
  },

  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },

  // created() {
  //   this.isLoggedinUser = 
  // },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
    getNavStyle() {
      return this.navStyle;
    },
    WL_count() {
      return this.$store.getters.WL_Counter;
    },
    cart_count() {
      return this.$store.getters.cartCounter;
    }
  },
  methods: {
    onScroll() {
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollPosition === 0) {
        this.navStyle = "background-color:rgba(234, 234, 234,0)";
      } else {
        this.navStyle = "background-color: #eaeaeafb";
      }
    },

    signup() {
      this.$router.push("/signup");
    },
    onCart() {
      this.$router.push("/cart");
    },
    onLogo() {
      this.$router.push("/");
    },
    onwishlist() {
      this.$router.push("/wishlist");
    },
    onArtwork() {
      this.$router.push("/artwork");
    },
    onLogOut() {
      this.$store.dispatch({
        type: "logout"
      });
      this.isLoggedinUser = null;
      this.$router.push("/login");
    }
  }
}
</script>