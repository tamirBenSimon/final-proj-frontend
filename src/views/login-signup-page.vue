<template>
  <section class=login-signup-container>
      <section class="user-login">
            <form @submit.prevent="login">
                <input type="text" placeholder="Name" v-model="credentials.username" />
                <input type="password" placeholder="Your Password" v-model="credentials.password" />
                <button>Login</button>
            </form>
        </section>
  </section>
</template>

<script>
export default {
  name:'login-signup-cmp',

}
</script>

<style>

</style>
