<template>
  <div :style="getNavStyle" class="navbar-container ">
    <div class="navbar-container-main">
      <img
        @click="onLogo"
        class="nav-bar-logo btn"
        src="../../public/img/icons/royal-logo.png"
        alt="Logo"
        title="Gallerior!"
      />
      <div class="nav-bar-input">
        <input class="navbar-input-inside" type="text" placeholder="Search" />
        <img
          class="nav-bar-search-img"
          src="../../public/img/icons/search.png"
          alt="Search"
        />
      </div>
    </div>

    <div class="nav-bar-3buttons">
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
          <a :href="'/#/cabinet/' + isLoggedinUser._id">Profile</a>
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
  name: "nav-bar",
  data() {
    return {
      navStyle: "background-color:rgba(234, 234, 234,0);",
      isLoggedinUser: null,
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

  created() {
    this.isLoggedinUser = this.$store.getters.loggedinUser;
  },
  computed: {
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
      // Get the current scroll position
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      // Because of momentum scrolling on mobiles, we shouldn't continue if it is less than zero
      if (currentScrollPosition < 300) {
        this.navStyle = "background-color:rgba(234, 234, 234,0);";
      } else {
        this.navStyle = "background-color: #eaeaead1;";
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
    onLogOut() {
      this.$store.dispatch({
        type: "logout"
      });
      this.isLoggedinUser = null;
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>


</style>