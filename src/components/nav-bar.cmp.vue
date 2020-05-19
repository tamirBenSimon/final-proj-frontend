<template>
  <div :style="getNavStyle" class="navbar-container">
    <div class="navbar-container-main">
      <img
        @click="onLogo"
        class="nav-bar-logo btn"
        src="../../public/img/icons/logo4.png"
        alt="Logo"
        title="Gallerior!"
      />
    </div>
    <div class="nav-bar-hamburger btn" @click="toggleNavBar">
      <img src="../../public/img/svg/hamburger.svg" alt="Menu" />
    </div>
    <div class="nav-bar-3buttons">
      <div class="nav-bar-wishlist-container nav-btn">
        <img
          @click="onwishlist(), toggleNavBar()"
          src="../../public/img/svg/heart1.svg"
          alt="Wish List"
          title="Wish List"
        />
        <div class="nav-bar-num-wish-list flex-center" v-if="WL_count">{{ WL_count }}</div>
      </div>

      <div class="nav-bar-line"></div>

      <div class="nav-bar-cart-container nav-btn">
        <img
          @click="onCart(), toggleNavBar()"
          src="../../public/img/svg/cart1.svg"
          alt="Cart"
          title="Cart"
        />
        <div class="nav-bar-num-cart flex-center" v-if="cart_count">{{ cart_count }}</div>
      </div>

      <div class="nav-bar-line"></div>

      <div class="dropdown nav-btn">
        <img class="dropbtn" src="../../public/img/svg/account1.svg" alt="User Picture" />
        <div class="dropdown-content">
          <a @click="toggleNavBar" href="#/">Home Page</a>
          <a @click="toggleNavBar" :href="'/#/cabinet/' + (loggedinUser?loggedinUser._id:null)">Profile</a>
          <a @click="toggleNavBar" v-if="!loggedinUser" href="/#/login">Login</a>
          <a v-if="loggedinUser" href="/#/login" @click="onLogOut(), toggleNavBar()">Log Out</a>
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
      navStyle: "background-color:rgba(234, 234, 234,0)"
    };
  },

  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },

  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    },
    isLoggedinUser() {
      console.log(this.$store.getters.loggedinUser , "nav-bar loggeduser")
      return this.$store.getters.loggedinUser? true:false;
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
      this.$router.push("/login");
      this.$store.dispatch({
        type: "logout"
      });
    },
    toggleNavBar() {
      document.body.classList.toggle("menu-open");
    }
  }
};
</script>