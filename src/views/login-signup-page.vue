<template>
  <section class=login-signup-container>
      <section v-if="!isSignup" class="user-login">
            <h2>please login</h2>
            <form @submit.prevent="onLogin">
                <input type="text" ref="name" placeholder="Username" v-model="credentials.userName" />
                <input type="password" placeholder="Your Password" v-model="credentials.password" />
                <button>Login</button>
            </form>
      </section>
      <section v-else class="user-signup">
            <h2>please sign up</h2>
            <form @submit.prevent="onSignup">
                <input type="text" ref="name" placeholder="Full name" v-model="signupCreds.fullName" />
                <input type="text" placeholder="Username" v-model="signupCreds.userName" />
                <input type="password" placeholder="Your Password" v-model="signupCreds.password" />
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
        userName: '',
        password: ''
      },
      signupCreds: {
        fullName: '',
        userName: '',
        password: ''
      },
      isSignup: false ///we need this???
    }
  },
   methods: {
    onLogin() {
      this.$store.dispatch({
        type: 'login', 
        userCred : this.credentials
      })
      .then((user)=>{
        if (user !== null) this.$router.push('/');
        this.credentials.userName = '';
        this.credentials.password = '';
      })
    },
    onSignup() {
      this.$store.dispatch({
        type: 'signup',
        userCred: this.signupCreds
      })
      .then(()=>{
        this.signupCreds.fullName = '';
        this.signupCreds.userName = '';
        this.signupCreds.password = '';
        this.$router.push('/');
      })
    },
  },
  created() {
    if (this.$route.path === '/signup') this.isSignup = true;
  },
  mounted(){
    this.$refs.name.focus();
  }
}
</script>
