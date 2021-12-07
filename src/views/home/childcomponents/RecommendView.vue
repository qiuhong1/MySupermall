<template>
  <div class="recommends">
    <div v-for="item in recommends" :key="item" class="recommends-item">
      <a :href="item.link"><img :src="item.image" alt=""></a>
      <div>{{item.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
name:'RecommendView',
props:{
  recommends:{
    type:Array,
    default(){
      return []
    }
  }
},
created(){

}
}
</script>

<style>
.recommends {
padding: 10px 0 20px;
display: flex;
border-bottom: 10px solid #eee;
}
.recommends .recommends-item{
  text-align: center;
  flex: 1;
  font-size: 13px;
}
.recommends .recommends-item img{
  vertical-align: middle;
  width: 70px;
  height: 70px;
  margin-bottom: 6px;
}
</style>