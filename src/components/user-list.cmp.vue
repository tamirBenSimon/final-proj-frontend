<template>
  <section>
    <h2>list:</h2>
    <table>
      
        <thead>
          <tr>
            <th> </th>
            <th>Full Name</th>
            <th>User Name</th>
            <th>Password</th>
            <th>Bio</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          <user-prev v-for="(user, index) in users" :key="user._id" :user="user" :count="index" />
        </tbody>

    </table>
  </section>
</template>

<script>
import userPrev from "./user-prev.cmp";

export default {
  name: "user-list",
  components: {
    userPrev
  },
  props: {
    users: Array
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