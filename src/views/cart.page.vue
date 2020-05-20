<template>
  <section class="cart-container">
    <img
      @click="onBack"
      class="cart-page-img-back btn"
      src="../../public/img/icons/left-arrow.png"
      alt="back"
      title="Back"
    />
    <h2>My cart</h2>
    <div class="cart-buy-all btn flex-center" @click="placeOrders">Buy all</div>
    <hr />

    <div class="cart-main-container">
      <div v-if="cart">
        <div class="cart-main" v-for="(product, index) in cart" :key="index">
          <img
            class="cart-img-product"
            :src="product.imgURLs[0]"
            alt="Product"
          />
          <div class="cart-tite">{{ product.title }}</div>
          <h2>${{ product.price }}</h2>
          <div @click="onRemove(product)" class="cart-remove">Remove</div>
          <div class="cart-buy" @click="placeOrderFirst(product)">Buy Now</div>
        </div>
      </div>
    </div>
    <hr />
  </section>
</template>

<script>
import Swal from "sweetalert2";
import { eventBus } from "../services/event-bus.service";

export default {
  name: "cart-cmp",
  data() {
    return {
      loggedinUser: null,
      cart: null,
    };
  },
  created() {
    this.loggedinUser = this.$store.getters.loggedinUser;
    this.$store
      .dispatch({
        type: "loadCart",
        userId: this.loggedinUser._id,
      })
      .then((currCart) => {
        this.cart = currCart;
      });

    eventBus.$on("cart_counter", () => {
      console.log( " hi on event bus cart add")
          this.loggedinUser = this.$store.getters.loggedinUser;
      this.$store
        .dispatch({
          type: "loadCart",
          userId: this.loggedinUser._id,
        })
        .then((currCart) => {
      console.log( " hi on event bus THEN", currCart)
          this.cart = currCart;
        });
    });
  },
  methods: {
    onBack() {
      this.$router.push("/artwork");
    },
    onRemove(product) {
      this.$store.dispatch({
        type: "removeCart",
        productId: product._id,
        userId: this.loggedinUser._id,
      });
    },
    placeOrders() {
      Swal.fire({
        title: "Are you sure?",
        text: "Are you sure that you want to buy this artwork?",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#dedede",
        confirmButtonText: "Yes, buy it!",
      }).then((result) => {
        if (result.value) {
          this.cart.forEach((item) => this.placeOrder(item));
          Swal.fire({
            showConfirmButton: false,
            timer: 2000,
            title: "Thank you!",
            text: "This artwork has been ordered",
            icon: "success",
          });
        }
      });
    },
    placeOrderFirst(product) {
      Swal.fire({
        title: "Are you sure?",
        text: "Are you sure that you want to buy this artwork?",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#dedede",
        confirmButtonText: "Yes, buy it!",
      }).then((result) => {
        if (result.value) {
          this.placeOrder(product);
          Swal.fire({
            showConfirmButton: false,
            timer: 2000,
            title: "Thank you!",
            text: "This artwork has been ordered",
            icon: "success",
          });
        }
      });
    },
    placeOrder(item) {
      const newOrder = {
        at: Date.now(),
        by: {
          fullName: this.loggedinUser.fullName,
          _id: this.loggedinUser._id,
          imgURL: this.loggedinUser.imgURL,
        },
        from: { fullName: item.createdBy.fullName, _id: item.createdBy._id },
        product: {
          _id: item._id,
          title: item.title,
          price: item.price,
        },
        status: "ordered",
        shippingInfo: {
          lat: 32.0853 + Math.random() * 10,
          lng: 34.781769 + Math.random() * 10,
        },
      };
      this.$store.dispatch({ type: "addOrder", order: newOrder }).then(() => {
        console.log("after order add before remove,with item:", item);
        this.onRemove(item);
      });
    },
  },
};
</script>
