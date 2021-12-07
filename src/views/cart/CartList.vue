<template>
  <div class="list-item">
    <div class="checkbox">
       <input type="checkbox" name="" id="" :checked="ischecked" @click="checkclick">
    </div>
    <div class="imgs">
      <img :src="cartlist.image" alt="商品图片">
    </div>
    <div class="cartcont">
      <div class="item-title">{{cartlist.title}}</div>
      <div class="item-desc">{{cartlist.desc}}</div>
      <div class="info-bottom">
        <div class="item-price">￥{{cartlist.realPrice}}</div>
        <div class="item-count">x{{cartlist.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name:'CartList',
props:{
  cartlist:{
    type:Object,
    default(){
      return {}
    }
  },
  ischecked:{
    type:Boolean,
    default(){
      return false
    }    
  }
},
methods:{
  checkclick(){
    // 这里的cartlist是cart中传入的,实际上就是$store中cartlist的item
    this.cartlist.checked=!this.cartlist.checked
    // console.log(this.$store.state.cartlist);
  }
}
}
</script>

<style>
   .list-item{
     display: flex;
     width: 100%;
     height: 121px;
     border-bottom: 1px solid #ccc;
   }
   .checkbox{
     width: 8%;
     display: flex;
    justify-content: center;
    align-items: center;
   }
   .checkbox input{
     width:20px;
     height: 20px;
   }
   .imgs{
     width: 24%;
     padding: 5px;
   }
   .imgs img{
     width: 80px;
     height: 100px;
     display: block;
     border-radius: 5px;
   }
   .cartcont{
     width: 68%;
   }
    .item-title, .item-desc {
      padding: 5px 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .item-title {
    font-size: 18px;
    margin-bottom: 4px;
  }
    .item-info, .item-desc {
    color: #666;
    font-size: 14px;
  }
   .info-bottom {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
  }
  .item-price {
    color: #ffb805;
    font-size: 20px;
  }
  .item-count {
    font-size: 20px;
  }
</style>