<template>
<div class="carta">
    <nav-bar class="shopcart">
      <template v-slot:center>购物车({{$store.state.cartlist.length}})</template>
    </nav-bar>
  <scroll class="contenta">
    <cart-list v-for="(item,index) in $store.state.cartlist" :key="index" :cartlist="item" :ischecked="item.checked"></cart-list>
  </scroll>
  <cart-bottom-bar class="cart-bottom-bar"></cart-bottom-bar>
</div>


</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import Scroll from '@/components/common/scroll/Scroll'
import CartBottomBar from './CartBottomBar.vue'
import CartList from './CartList.vue'
export default {
name:'cart',
components:{
  NavBar,
  CartList,
  Scroll,
  CartBottomBar
},

}
</script>

<style>
.shopcart{
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
  font-size: 18px;
}
.contenta{
  /* height: calc(100vh - 44px - 49px); */
  width: 100%;
  position: fixed;
  overflow: hidden;
  top: 44px;
  bottom: 89px;
  left: 0;
}
.cart-bottom-bar{
  position: fixed;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>