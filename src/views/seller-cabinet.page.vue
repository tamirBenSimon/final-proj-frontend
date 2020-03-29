<template>
  <section class="seller-cabinet-container">
    <h2>Seller's cabinet</h2>
    <img class="seller-gallery-img" :src="user.imgUrl">
    <h4>{{user.fullName}}</h4>
    <h4>Artist's bio: {{user.bio}}</h4>
    <hr>
    <!-- <template> -->
      <div class="seller-cabinet-radio-btn btn">
        <el-radio-group v-model="radio1">
          <el-radio-button label="Artworks"></el-radio-button>
          <el-radio-button label="Orders"></el-radio-button>
        </el-radio-group>
      </div>
    <!-- </template> -->
    <product-list v-if="radio1 === 'Artworks'" :artworks="artworks" />
    <order-list v-else v-for="order in orders" :orders="orders" :key="order.id"></order-list>
    <!-- <h2>your orders,sir: </h2>
     <ul>
        <li v-for="order in orders" :key="order.id"><pre>{{order}}</pre></li>
      </ul> -->
  </section>
</template>

<script>
// import {eventBus} from '../services/event-bus.service.js'
import productList from "../components/product-list.cmp";
import orderList from "../components/order-list.cmp";
export default {
  name:'seller-cabinet',
  data () {
      return {
        radio1: 'Artworks'
      };
    },
  created() {
    const sellerId = this.$route.params.id;
    this.$store.dispatch({
      type: "loadUser", userId : sellerId
    });
    this.$store.dispatch({
      type: "loadSellerOrders", sellerId
    });
    this.$store.dispatch({
      type: "loadArtworks", filterBy: {creatorId: sellerId}
    });
  },
  computed: {
    orders() {
      return this.$store.getters.orders;
    },
    user() {
      return this.$store.getters.selectedUser;
    },
    artworks() {
      console.log('this.$store.getters.artworks',this.$store.getters.artworks);
      return this.$store.getters.artworks;
    }
  },
  components:{
    orderList,
    productList
  }
}
</script>