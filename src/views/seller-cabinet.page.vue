<template>
  <section class="seller-cabinet-container">
    <h2>Seller's cabinet</h2>
    <img class="seller-gallery-img" :src="user.imgUrl" />
    <h4>{{user.fullName}}</h4>
    <h4>Artist's bio: {{user.bio}}</h4>
    <hr />
    <!-- <template> -->
    <div class="seller-cabinet-radio-btn btn">
      <el-radio-group v-model="radio1">
        <el-radio-button label="Artworks"></el-radio-button>
        <el-radio-button label="Orders"></el-radio-button>
      </el-radio-group>
    </div>
    <!-- </template> -->
    <product-list v-if="radio1 === 'Artworks'" :artworks="artworks" />
    <order-list v-else :orders="orders"></order-list>
    <button class="seller-gallery-chat-btn btn" @click="onIsMsg">
      Chat
      <span>with buyer</span>
    </button>
    <chat-seller v-if="isMsg" @close="onIsMsg" class="seller-gallery-chat-seller" />
    <!-- <h2>your orders,sir: </h2>
     <ul>
        <li v-for="order in orders" :key="order.id"><pre>{{order}}</pre></li>
    </ul>-->
    <!-- <order-list v-else v-for="order in orders" :orders="orders" :key="order.id"></order-list> -->
  </section>
</template>

<script>
import chatSeller from "../components/chat-window.cmp";
import productList from "../components/product-list.cmp";
import orderList from "../components/order-list.cmp";
export default {
  name: "seller-cabinet",
  data() {
    return {
      radio1: "Artworks",
      isMsg: false
    };
  },

  created() {
    const sellerId = this.$route.params.id;
    console.log("creatingggg, " ,sellerId)
    this.$store.dispatch({
      type: "loadUser",
      userId: sellerId
    });
      this.$store.dispatch({
        type: "loadArtworks",
                      filterBy: { creatorId: sellerId }

      });
    this.$store.dispatch({
      type: "loadSellerOrders",
      sellerId
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
      console.log("getting, " ,this.$store.getters.artworks)
      return this.$store.getters.artworks;
    }
  },
  methods: {
    onIsMsg() {
      this.isMsg = !this.isMsg;
    }
  },
  components: {
    orderList,
    productList,
    chatSeller
  }
};
</script>