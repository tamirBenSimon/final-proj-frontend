<template>
  <section>
    <button @click="onClose">X</button>
    <h1>Chat</h1>
    <ul>
      <li v-for="(txt,idx) in txts" :key="idx">{{txt}}</li>
    </ul>
    <input type="text" placeholder="Text" v-model="txt">
    <button @click="addMsg">Send</button>
  </section>
</template>

<script>
export default {
  name: 'chat-seller',
  data(){
    return{
      txt: '',
      txts: []
    }
  },
  methods:{
    addMsg(){
      setTimeout(()=>{
        this.txts.push('How can I help you?');
      },1000)
      this.txts.push(this.txt);
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