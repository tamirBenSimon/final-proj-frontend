<template>
  <div class="home">
    <h2>hey!</h2>
    <HelloWorld />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'market-app',
  components: {
    HelloWorld
  }
}
</script>
