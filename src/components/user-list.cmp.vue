<template>
  <section>
    <h2>list:</h2>
    <user-prev v-for="user in users" :key="user._id" :user="user" />
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