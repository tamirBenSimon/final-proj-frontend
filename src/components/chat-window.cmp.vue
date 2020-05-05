<template>
  <section>
    <button @click="onClose">X</button>
    <h2>Chat</h2>
    <ul>
      <li v-for="(msg,idx) in msgs" :key="idx">{{msg.user}}:{{msg.txt}}</li>
    </ul>
    <input type="text" placeholder="Text" v-model="txt" />
    <button class="send-btn" @click="sendMsg">Send</button>
  </section>
</template>

<script>
import socketService from "@/services/SocketService.js";
export default {
  name: "chat-seller",
  data() {
    return {
      txt: "",
      msgs: []
    };
  },
  created() {
    socketService.setup();
    socketService.on("chat addMsg", msg => {
      this.msgs.push(msg);
    });
  },
  // computed() {
  //   addMsg() {
  //     socketService.on('chat addMsg', msg);
  //   }
  // },
  methods: {
    sendMsg() {
      let user = this.$store.getters.loggedinUser.fullName;
      socketService.emit("chat newMsg", { user, txt: this.txt });
      this.txt = "";
    },
    onClose() {
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
button {
  border: 0px;
}
ul {
  padding: 0;
}
ul > *:nth-child(odd) {
  text-align: start;
}
ul > *:nth-child(even) {
  text-align: end;
}
li {
  list-style-type: none;
}
input {
  width: 100%;
  height: 30px;
  margin-bottom: 5px;
}
</style>