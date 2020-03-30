<template>
    <header class="home-main-header-container" id="nav">

      <div v-if="currNum === 1" class="home-main">
        <img class="home-main-img" src="../../public/img/gallery/gallery1.jpg" alt="Home Picture">
        <div class="home-main-callBack btn flex-center">call bla bla to action1</div>
      </div>

      <div v-if="currNum === 2" class="home-main">
        <img class="home-main-img" src="../../public/img/gallery/gallery2.jpg" alt="Home Picture">
        <router-link to="/artwork">
          <div class="home-main-callBack btn flex-center">Begin exploring now...</div>
        </router-link>
      </div>

      <div v-if="currNum === 3" class="home-main">
        <img class="home-main-img" src="../../public/img/gallery/gallery3.jpg" alt="Home Picture">
        <div class="home-main-callBack btn flex-center">call bla bla to action2</div>
      </div>

      <div v-if="currNum === 4" class="home-main">
        <img class="home-main-img" src="../../public/img/gallery/gallery4.jpg" alt="Home Picture">
        <div class="home-main-callBack btn flex-center">call bla bla to action3</div>
      </div>

      <div v-if="currNum === 5" class="home-main">
        <img class="home-main-img" src="../../public/img/gallery/gallery5.jpg" alt="Home Picture">
        <div class="home-main-callBack btn flex-center">call bla bla to action4</div>
      </div>

      </header>
</template>

<script>
export default {
  data(){
    return {
        currNum: 2,
        counterTime: null
    }
  },
  created(){
      this.counterTime = setInterval(()=>{
        if(this.currNum === 5) this.currNum = 0;
        this.currNum++;
      }, 10000)
  },
  destroyed(){
    const counter = this.counterTime;
    clearInterval(counter);
  },
  computed:{
    
  },
  methods:{

  }
}
</script>

<style>

</style>