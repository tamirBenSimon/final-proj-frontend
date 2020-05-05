<template>
  <header class="home-main-header-container" id="nav">
    <!-- <div v-if="currNum === 1" class="home-main flex-center">
      <img class="home-main-img" src="../../public/img/gallery/gallery11.jpg" alt="Home Picture" />
      <router-link to="/sellerGallery/5e7f97841c9d4400006b1455">
        <div class="home-main-callBack btn flex-center">Lets see some artists...</div>
      </router-link>
    </div>-->

    <div v-if="currNum === 2" class="home-main">
      <img class="home-main-img" src="../../public/img/gallery/gallery4.jpg" alt="Home Picture" />
      <div class="home-container-main">
        <div class="home-main-title flex-center">Discover The Creative Universe Of Our Artists</div>
        <router-link to="/artwork" class="home-btn-explor">
          <div class="home-main-callBack btn flex-center">
            Begin exploring
            <i class="fas fa-long-arrow-alt-right"></i>
          </div>
        </router-link>
      </div>
    </div>

    <!-- <div v-if="currNum === 3" class="home-main">
      <img class="home-main-img" src="../../public/img/gallery/gallery5.jpg" alt="Home Picture" />
      <router-link to="/login">
        <div class="home-main-callBack btn flex-center">Create account...</div>
      </router-link>
    </div>-->
  </header>
</template>

<script>
export default {
  data() {
    return {
      currNum: 2,
      counterTime: null
    };
  },
  created() {
    // this.counterTime = setInterval(() => {
    //   if (this.currNum === 3) this.currNum = 0;
    //   this.currNum++;
    // }, 4000);
  },
  destroyed() {
    const counter = this.counterTime;
    clearInterval(counter);
  }
};
</script>
