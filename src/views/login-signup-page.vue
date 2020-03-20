<template>
  <section class=login-signup-container>
      <section v-if="!isSignup" class="user-login">
            <h2>please login</h2>
            <form @submit.prevent="login">
                <input type="text" placeholder="email" v-model="credentials.username" />
                <input type="password" placeholder="Your Password" v-model="credentials.password" />
                <button>Login</button>
            </form>
      </section>
      <section v-else class="user-signup">
            <h2>please sign up</h2>
            <form @submit.prevent="signup">
                <input type="text" placeholder="Full name" v-model="credentials.fullName" />
                <input type="text" placeholder="email" v-model="credentials.username" />
                <input type="password" placeholder="Your Password" v-model="credentials.password" />
                <button>Login</button>
            </form>
      </section>
  </section>
</template>

<script>
export default {
  name:'login-signup-cmp',
  data() {
    return {
      credentials: {
        username: '',
        password: ''
      },
      signupCreds: {
        fullName: '',
        username: '',
        password: ''
      },
      isSignup: false
    }
  },
   methods: {
    login(credentials) {
      this.$store.dispatch({
        type: 'login', credentials
      })
    },
    signup(signupCreds) {
      this.$store.dispatch({
        type: 'signup', signupCreds
      })
    },

  },
  created() {
    if (this.$route.path === '/signup') this.isSignup = true;
  }

}
</script>

<style>

</style>
