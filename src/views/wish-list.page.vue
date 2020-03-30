<template>
  <section class="wish-list-container">
    <img @click="onBack" class="wish-list-page-img-back btn" src="../../public/img/icons/left-arrow.png" alt="back" title="Back">
    <h2>My Wish List</h2>
    <hr>
    <div class="wish-list-main-container">
      <div v-if="wishlist">
        <div class="wish-list-main" v-for="(product, index) in wishlist" :key="index">
          <img class="wish-list-img-product" :src="product.imgURLs[0]" alt="Product">
          <div class="wish-list-tite">{{product.title}}</div>
          <h2>${{product.price}}</h2>
          <div @click="onRemove(product)" class="wish-list-remove">Remove</div>
          <div class="wish-list-buy">Buy Now</div>
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
      wishlist: null 
    }
  },
  created(){
    this.loggedinUser = this.$store.getters.loggedinUser;
    this.$store.dispatch({
      type: "loadWishlist",
      userId: this.loggedinUser._id
    })
    .then(() =>{
       this.wishlist = this.$store.getters.wishlist;
    })
  },
  methods:{
      onRemove(product){
      this.$store.dispatch({
      type: "removeFromWishlist",
      productId: product._id,
      userId: this.loggedinUser._id
      })
    }
  }
}
</script>