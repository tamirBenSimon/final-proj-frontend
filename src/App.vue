


<template>
  <div id="app">
    <nav-bar/>
    <router-view/>
    <footer-bar/>
  </div>
</template>

<script>
import navBar from './components/nav-bar.cmp'
import footerBar from './components/footer.cmp'

export default {
  components:{
    navBar,
    footerBar
  }
}
</script>

<style lang="scss">

</style>
