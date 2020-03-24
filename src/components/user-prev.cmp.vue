<template>
    <tr>
        <td>{{count+1}}</td>
        <td><h2 class="user-prev-fullName">{{user.fullName}}</h2></td>
        <td><h3 class="user-prev-userName">{{user.userName}}</h3></td>
        <!-- <td><h4 class="user-prev-password">{{user.password}}</h4></td> -->
        <td><p class="user-prev-bio">{{user.bio}}</p></td>
        <td><button @click="onDelete(user._id)">Delete User</button></td>
    </tr>
</template>

<script>
import {eventBus} from '../services/event-bus.service.js'

export default {
  name: 'user-prev',
   props:{
     user: Object,
     count: Number
   },
   methods:{
     onDelete(userId){
       eventBus.$emit('delete', userId);
      }
    }
}
</script>

<style scoped>
table, th, td {
  border: 1px solid grey;
  padding: 5px;
  border-collapse: collapse;
}

</style>
