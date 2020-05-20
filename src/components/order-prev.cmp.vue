<template>
  <tr>
    <td>{{count+1}}</td>
    <td>{{fullDate}}</td>
    <td class="order-prev-img-buyer">
      <img class="order-prev-img" :src="order.by.imgURL" alt />
      <div class="order-prev-buyer">{{order.by.fullName}}</div>
    </td>
    <td>{{order.product.title}}</td>
    <td>{{order.product.price}}</td>
    <td class="order-td">{{order.status}}</td>
    <td>
      <pre>{{order.shippingInfo}}</pre>
    </td>
    <td>
      <div class="change-status-btn btn" @click="changeStatus()">change status</div>
    </td>
    <div v-if="isOpenModal" class="order-status-modal">
      <div @click="closeModal" class="exit-modal btn flex-center">X</div>
      <div class="status btn" @click="changeCurrStatus('ordered')">ordered</div>
      <div class="status btn" @click="changeCurrStatus('AwaitingShipping')">Awaiting Shipping</div>
      <div class="status btn" @click="changeCurrStatus('Shipped')">Shipped</div>
      <div class="status btn" @click="changeCurrStatus('onTheWay')">On The Way</div>
      <div class="status btn" @click="changeCurrStatus('AwaitingPickup')">Awaiting Pickup</div>
    </div>
  </tr>
</template>

<script>
export default {
  name: "order-prev",
  props: {
    order: Object,
    count: Number
  },
  data() {
    return {
      isOpenModal: false
    };
  },
  created() {
    this.$store
      .dispatch({
        type: "getLocation",
        lat: this.order.shippingInfo.lat,
        lng: this.order.shippingInfo.lng
      })
      .then(strLocation => {
        console.log("strLocation: ", strLocation);
        if (!strLocation) {
          this.order.shippingInfo = "Above the sea";
        }
        let arrLocation = strLocation.split(" ");
        let city = arrLocation[1];
        let country = arrLocation[arrLocation.length - 1];
        if (city.endsWith(",")) city = city.slice(0, -1);
        this.order.shippingInfo = `country: ${country},\ncity: ${city}`;
      });
  },
  computed: {
    fullDate() {
      var currentDate = new Date(this.order.at);
      var date = currentDate.getDate();
      var month = currentDate.getMonth(); //Be careful! January is 0 not 1
      var year = currentDate.getFullYear();
      var dateString = date + "-" + (month + 1) + "-" + year;
      return dateString;
    }
  },
  methods: {
    changeStatus() {
      this.isOpenModal = true;
    },
    closeModal() {
      this.isOpenModal = false;
    },
    changeCurrStatus(status) {
      switch (status) {
        case "ordered": {
          this.order.status = "ordered";
          this.isOpenModal = false;
          break;
        }
        case "AwaitingShipping": {
          this.order.status = "Awaiting Shipping";
          this.isOpenModal = false;
          break;
        }
        case "Shipped": {
          this.order.status = "Shipped";
          this.isOpenModal = false;
          break;
        }
        case "onTheWay": {
          this.order.status = "on The Way";
          this.isOpenModal = false;
          break;
        }
        case "AwaitingPickup": {
          this.order.status = "Awaiting Pickup";
          this.isOpenModal = false;
          break;
        }
      }
    }
  }
};
</script>

<style scoped>
table,
th,
td {
  border: 1px solid grey;
  padding: 5px;
  border-collapse: collapse;
}
.order-td {
  font-weight: 700;
}
pre {
  text-align: start;
}
.order-status-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #80808099;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 5;
}
.status {
  background-color: rgb(202, 0, 204);
  color: #eee;
  padding: 8px;
  min-width: 300px;
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 20px;
  text-align: center;
  box-shadow: 0 0 5px 0px #00000096;
}
.exit-modal {
  position: fixed;
  top: 30px;
  right: 30px;
  width: 40px;
  height: 40px;
  background-color: rgb(226, 4, 228);
  box-shadow: 0 0 5px 0px #00000096;
  font-size: 20px;
  font-weight: 700;
}
.change-status-btn {
  background-color: rgb(223, 223, 223);
  padding: 5px;
  border: 2px solid slategrey;
  transition: all 0.5s;
  font-weight: 700;
}
.change-status-btn:hover {
  transform: scale(1.1);
}
</style>
