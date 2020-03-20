<template>
  <div>
    <div class="artwork-filter">
      <input
        @input="onFilter"
        type="text"
        v-model="filterBy.name"
      />
      <input type="number" v-model.number="filterBy.minPrice" />
      <input type="number" v-model.number="filterBy.maxPrice" />
      <input type="text" v-model="filterBy.tags" />
      <button @click.prevent="onFilter">filter</button>
    </div>
    <pre>
        {{ this.filterBy }}
    </pre>
  </div>
</template>
<script>

export default {
  name: "product-list",


data(){
    return{
        filterBy:{
            name:'',
            minPrice:0,
            maxPrice:0,
            tags:'',

        }
    }
    },
    methods:{
        onFilter(){
        this.$emit('onFilter', {...this.filterBy})
        }
    }
};
</script>
