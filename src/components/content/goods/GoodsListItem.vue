<template>
  <div class="goods-item" @click="itemsClick">
    <img :src="showImg" alt="">
    <div>
      <p>{{goodsitem.title}}</p>
      <span class="price">{{goodsitem.price}}</span>
      <span class="collect">✩{{goodsitem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
name:'GoodsListItem',
props:{
  goodsitem:{
    type:Object,
    default(){
      return {}
    }
  }
},
computed:{
  showImg(){
    return  this.goodsitem.image||this.goodsitem.show.img
  }
},
methods:{
  itemsClick(){
    this.$router.push('/detail/'+this.goodsitem.iid)
  }
}
}
</script>

<style>
.goods-item{
  text-align: center;
  width: 48%; 
  height: 320px;
  margin: 0 0 5px 0 ;
}
.goods-item img{
  width: 100%;
  border-radius: 5px;
}
.goods-item p{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.price{
  color:var(--color-high-text);
  padding-right: 13px;
}
</style>