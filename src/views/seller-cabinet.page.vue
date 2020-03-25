<template>
  <section class="seller-cabinet-container">
    <h2>Seller's cabinet</h2>
    <img class="seller-gallery-img" :src="user.imgUrl">
    <h4>{{user.fullName}}</h4>
    <h4>Artist's bio: {{user.bio}}</h4>
    <hr>
      <h2>your orders,sir: </h2>
      <ul>
        <li v-for="order in orders" :key="order.id"><pre>{{order}}</pre></li>
      </ul>
  </section>
</template>

<script>
export default {
  name:'seller-cabinet',
  created() {
    const sellerId = this.$route.params.id;
    this.$store.dispatch({
      type: "loadUser", userId : sellerId
    });
    this.$store.dispatch({
      type: "loadSellerOrders", sellerId
    });
  },
  computed: {
    orders() {
      return this.$store.getters.orders;
    },
    user() {
      return this.$store.getters.selectedUser;
    }
  }

  
}
</script>