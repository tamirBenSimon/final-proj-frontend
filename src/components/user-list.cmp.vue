<template>
  <section class="flex-center">
    <h2>Admin Page:</h2>
    <h3>Users in system:</h3>
    <table>
      
        <thead>
          <tr>
            <th> </th>
            <th>Full Name</th>
            <th>User Name</th>
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
section{
  flex-direction: column; 
}
h2{
  margin-top: 60px;
  text-decoration-line: underline;
  font-weight: 600;
  font-size: 18px;
}
h3{
  margin-top: 0;
  font-weight: 400;
  font-size: 15px;
}

</style>