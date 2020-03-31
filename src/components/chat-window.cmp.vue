<template>
  <section>
    <button @click="onClose">X</button>
    <h1>Chat</h1>
    <ul>
      <li v-for="(txt,idx) in txts" :key="idx">{{txt}}</li>
    </ul>
    <input type="text" placeholder="Text" v-model="txt">
    <button @click="sendMsg">Send</button>
  </section>
</template>

<script>
import socketService from "@/services/SocketService.js";
export default {
  name: 'chat-seller',
  data(){
    return{
      txt: '',
      txts: []
    }
  },
  created() {
    socketService.setup(); 
    socketService.on('chat addMsg', msg=>{
      this.txts.push(msg);
           
        });
  },
  // computed() {
  //   addMsg() {
  //     socketService.on('chat addMsg', msg);
  //   }
  // },
  methods:{
    sendMsg(){
      socketService.emit('chat newMsg', this.txt);
      this.txt='';
    },
    onClose(){
        this.$emit('close')
    }
  }
}
</script>

<style scoped>
ul{
  padding: 0;
}
ul>*:nth-child(odd){
text-align: start;
}
ul>*:nth-child(even){
text-align: end;
}
li{
  list-style-type: none;
}
input{
  width: 100%;
  height: 30px;
}
</style>