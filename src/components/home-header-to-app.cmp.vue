<template>
    <header class="home-main-header" id="nav">
      <div v-if="currNum === 1">
        <img src="../../public/img/gallery/gallery1.jpg" alt="Home Picture">
        <div>call bla bla to action1</div>
      </div>
      <div v-if="currNum === 2">
        <img src="../../public/img/gallery/gallery2.jpg" alt="Home Picture">
        <div>Begin exploring now...</div>
      </div>
      <div v-if="currNum === 3">
        <img src="../../public/img/gallery/gallery3.jpg" alt="Home Picture">
        <div>call bla bla to action2</div>
      </div>
      <div v-if="currNum === 4">
        <img src="../../public/img/gallery/gallery4.jpg" alt="Home Picture">
        <div>call bla bla to action3</div>
      </div>
      <div v-if="currNum === 5">
        <img src="../../public/img/gallery/gallery5.jpg" alt="Home Picture">
        <div>call bla bla to action4</div>
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
  // created(){
  //     this.counterTime = setInterval(()=>{
  //       if(this.numImg === 4) this.numImg = 0;
  //       console.log('inside@!!!', this.numImg);
  //       this.numImg++;
  //     }, 4000)
  // },
  destroyed(){
    const counter = this.counterTime;
    console.log('destroy!!!');
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