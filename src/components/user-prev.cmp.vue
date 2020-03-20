<template>
  <section class="user-prev-container">
    <img class="user-prev-img-user" :src="user.imgUrl" alt="User Picture">
    <div class="user-prev-main">
        <h2 class="user-prev-fullName">{{user.fullName}}</h2>
        <h3 class="user-prev-userName">UserName :{{user.userName}}</h3>
        <h4 class="user-prev-password">Password: {{user.password}}</h4>
        <p class="user-prev-bio">Bio: {{user.bio}}</p>
        <button @click="onDelete(user._id)">Delete User</button>
   </div>
  </section>
</template>

<script>
import {eventBusService} from '../services/event-bus.service.js'

export default {
  name: 'user-prev',
   props:{
     user: Object
   },
  
   methods:{
     onDelete(userId){
       eventBusService.$emit('delete', userId);
      }
    }
  
}
</script>

<style>
