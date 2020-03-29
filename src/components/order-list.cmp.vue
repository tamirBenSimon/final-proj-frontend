<template>
  <section>
      <table>

        <thead>
          <tr>
            <th> </th>
            <th>Date</th>
            <th>Ordered by</th>
            <th>Item's name</th>
            <th>price</th>
            <th>Order status</th>
            <th>Order location</th>
          </tr>
        </thead>

        <tbody>
          <order-prev
           v-for="(order, index) in orders"
            :key="order._id" 
            :order="order" 
            :count="index" 
          />
        </tbody>
        
      </table>
  </section>
</template>

<script>
import orderPrev from "./order-prev.cmp";

export default {
  name: "oreder-list",
  components: {
    orderPrev
  },
  props: {
    orders: Array
  }
};
</script>
<style scoped>
table, th, td {
  border: 1px solid grey;
  padding: 5px;
  border-collapse: collapse;
}
</style>