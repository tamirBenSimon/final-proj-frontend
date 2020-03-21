<template>
  <section class="wish-list-container">
    <h2>My Wish List</h2>
    <hr>
    <div class="wish-list-main-container">
      <div v-if="wishList" >
        <div v-for="(product, index) in wishList.wishList" :key="index">
          <img class="wish-list-img-product" :src="product.imgURLs[0]" alt="Product">
          <h2>Price: {{product.price}}</h2>
        </div>
      </div>
    </div>
    <hr>
  </section>
</template>

<script>

export default {
  name:'wish-list-cmp',
  data(){
    return{
      loggedinUser: null,
      wishList: null 
    }
  },
  created(){
    this.loggedinUser = this.$store.getters.loggedinUser;
    this.$store.dispatch({
      type: "loadwishList",
      userId: this.loggedinUser._id
    })
    .then(currwishList =>{
      console.log('currwishList in cmp: ',currwishList);
      this.wishList = currwishList; 
    })
  },
  methods:{

  }

}
</script>

<style>

</style>