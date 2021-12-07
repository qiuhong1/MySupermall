<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isactive"><slot name="item-icon" ></slot></div>
    <div v-else><slot name="item-active-icon"></slot></div>
    <!-- slot插槽会被替换，所以在外层添加div避免被替换 -->
    <div :class="{active:isactive}"><slot name="item-text"></slot></div>
  </div>
</template>


<script>
export default {
  name:'TabBarItem',
  data(){
    return {
      // isactive:true
    }
  },
  computed:{
    isactive(){
      // console.log(this.$route.path);
      // return this.$route.path.indexOf(this.path)!==-1
      return this.$route.path===this.path
    }
  },
  props:{
    path:String
  },
  methods:{
    itemClick(){
      this.$router.push(this.path).catch(err=>{})
      // console.log(this.path);
    }
  }
}
</script>

<style>
  .tab-bar-item{
    flex:1;
    text-align: center;
    height: 49px;
  }
  .tab-bar .tab-bar-item img{
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-bottom: 5px;
  }
  .active{
    color: red;
  }
</style>