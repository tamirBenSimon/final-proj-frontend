<template>
    <tr>
        <td>{{count+1}}</td>
        <td>{{fullDate}}</td>
        <td class="order-prev-img-buyer">
          <img class="order-prev-img" :src="order.by.imgURL"  alt="">
          <div class="order-prev-buyer">{{order.by.fullName}}</div>
        </td>
        <td>{{order.product.title}}</td>
        <td>{{order.product.price}}</td>
        <td>{{order.status}}</td>
        <td>{{order.shippingInfo}}</td>
        <td><button @click="changeStatus(order.status)">change status</button></td>
    </tr>
</template>

<script>

export default {
  name: 'order-prev',
   props:{
     order: Object,
     count: Number
   },
   methods:{
     changeStatus(orderStatus){
       console.log('changing order something ',orderStatus)
      }
    },
    computed: {
      fullDate() {
        var currentDate = new Date(this.order.at);
        var date = currentDate.getDate();
        var month = currentDate.getMonth(); //Be careful! January is 0 not 1
        var year = currentDate.getFullYear();
        var dateString = date + "-" +(month + 1) + "-" + year;
        return dateString;
      }

    },
}
</script>

<style scoped>
table, th, td {
  border: 1px solid grey;
  padding: 5px;
  border-collapse: collapse;
}
</style>
