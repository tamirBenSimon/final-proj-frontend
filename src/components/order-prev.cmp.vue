<template>
    <tr>
        <td>{{count+1}}</td>
        <td>{{order.at}}</td>
        <td><img :src="order.by.imgURL"  alt=""><div>{{order.by.fullName}}</div></td>
        <td>{{order.product.title}}</td>
        <td>{{order.product.price}}</td>
        <td>{{order.status}}</td>
        <td>{{order.shippingInfo}}</td>
        <td><button @click="changeStatus(order.status)">change status</button></td>
    </tr>
</template>

<script>
// import {eventBus} from '../services/event-bus.service.js'

export default {
  name: 'order-prev',
   props:{
     order: Object,
     count: Number
   },
   methods:{
     changeStatus(orderStatus){
       console.log('changing order something ',orderStatus)
      //  eventBus.$emit('delete', userId);
      }
    }
}
</script>

<style scoped>
table, th, td {
  border: 1px solid grey;
  padding: 5px;
  border-collapse: collapse;
}

</style>
