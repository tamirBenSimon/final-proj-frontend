<template>
  <section class="market-app-container">
    <h2>Welcome To Marketplace!</h2>
    <product-list />
  </section>
</template>

<script>
import productList from '../components/product-list.cmp'

export default {
  name: 'market-app',
  components: {
    productList
  }
}
</script>
