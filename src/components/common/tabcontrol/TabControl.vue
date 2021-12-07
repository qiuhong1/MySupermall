<template>
  <div class="tab-control">
    <div class="tab-control-item" v-for="(item,index) in titles" :key="item"  
    :class="{active:index===currentindex}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
name:'TabControl',
data(){
  return{
    currentindex:0
  }
},
props:{
  titles:{
    type:Array,
    default(){
      return []
    }
  },
},
methods:{
  itemClick(index){
    this.currentindex=index,
    this.$emit('tabClick',index)
  }
}
}
</script>

<style>
.tab-control{
  display: flex;
  text-align: center;
}
.tab-control-item{
  flex: 1;
  height: 40px;
  line-height: 40px;
  font-size:15px;
}
span{
  padding: 3px;
}
.active span{
  border-bottom: 3px solid var(--color-high-text);
}
.active{
  color:var(--color-high-text);
  }
</style>