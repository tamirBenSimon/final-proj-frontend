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
      isSignup: false ///we need this???
    }
  },
   methods: {
    login() {
      this.$store.dispatch({
        type: 'login', 
        userCred : this.credentials
      })
      .then((user)=>{
        console.log('user is a: ', user);
        if (user !== null) this.$router.push('/artwork');
      })
      
      this.credentials.username = '';
      this.credentials.password = '';
    },
    signup(signupCreds) {
      this.$store.dispatch({
        type: 'signup', signupCreds
      })
      this.signupCreds.fullName = '';
      this.signupCreds.username = '';
      this.signupCreds.password = '';
    },

  },
  created() {
    if (this.$route.path === '/signup') this.isSignup = true;
  }

}
</script>

<style>

</style>
