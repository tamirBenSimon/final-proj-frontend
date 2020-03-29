<template>
  <section class="footer-main">
    <img @click="onLogo" class="footer-logo btn" src="../../public/img/icons/royal-logo.png" alt="Logo" title="Gallerior!"> 
    <h2 class="footer-line">Copyright &copy; 2020 Gallerior - All Rights Reserved</h2>
  </section>
</template>

<script>
export default {
  methods:{
     onLogo(){
      this.$router.push('/');
    }
  }

}
</script>