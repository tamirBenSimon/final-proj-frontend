<template>
  <section>
    <h1>Admin Page:</h1>
    <user-list :users="users" />
  </section>
</template>

<script>
import userList from "../components/user-list.cmp";

export default {
  name:'admin-cmp',
  computed: {
    users() {
      return this.$store.getters.users;
    }
  },
  created() {
    this.$store.dispatch({
      type: "loadUsers"
    });
  },
  components:{
    userList
  }

}
</script>

<style>

</style>
