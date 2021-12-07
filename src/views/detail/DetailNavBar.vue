<template>
  <div class="detail-nav-bar">
    <div class="navleft">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="navright">
      <div class="cart" @click="addCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
name:'DetailNavBar',
methods:{
  addCart(){
    // console.log('tianjiale');
    this.$emit('addCart')
  }
}
}
</script>

<style>
.detail-nav-bar{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 49px;
  display: flex;
  text-align: center;
  background-color: #fff;
}

  .navleft,.navright {
    display: flex;
    width: 50%;

  }
  .navleft .icon {
    display: block;
    width: 24px;
    height: 24px;
    margin: 5px 21px 3px;
    background:url('../../assets/images/detail/detail_bottom.png') 0 0/100%;
  }
  .navleft .shop {
    background-position: 0 57px;
  }
  .navleft .service {
    background-position: 0 107px;
  }
  .text {
    font-size: 14px;
  }
  .cart {
    height: 49px;
    width: 50%;
    background-color: #fff737;
    text-align: center;
    color:#666;
    font-size: 16px;
    line-height: 49px;
  }
  .buy {
    height: 49px;
    width: 50%;
    background-color: var(--color-tint);
    text-align: center;
    color:#fff;
    font-size:16px;
    line-height: 49px;
  }
</style>