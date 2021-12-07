<template>
  <div class="cart-bottom-bar">
    <div class="barleft">
      <input type="checkbox" :checked="allchecked" @click="inpclick">全选
    </div>
    <div class="barcenter">合计：{{totalprice}}</div>
    <div class="barright">去计算({{checklength}})</div>
  </div>
</template>

<script>
export default {
name:'CartBottomBar',
computed:{
  totalprice(){
    return  this.$store.state.cartlist.filter(item=>{
      return item.checked
    }).reduce((prevalue,item)=>{
      return prevalue+item.realPrice*item.count
    },0).toFixed(2)
  },
  checklength(){
    return  this.$store.state.cartlist.filter(item=>{
      return item.checked
    }).length
  },
  allchecked(){
    if(this.$store.state.cartlist.length==0){
       return false
    }
    // let cartlistitem=this.$store.state.cartlist
    // for(let item of cartlistitem){
    //   if(!item.checked){
    //     return false
    //   }
    //   return true
    // }
    return !(this.$store.state.cartlist.filter(item=>!item.checked).length)
  },
},
methods:{
  inpclick(){
    // this.allchecked=!this.allchecked
    if(this.allchecked){
      this.$store.state.cartlist.forEach(item => {
        return item.checked=false
      })
    }else{
      this.$store.state.cartlist.forEach(item => {
        return item.checked=true
      })
    }
  }
}
}
</script>

<style>
.cart-bottom-bar{
  width: 100%;
  height: 40px;
  background-color: #ccc;
  display: flex;
  /* line-height: 50px; */
}
.barleft{
width: 20%;
padding: 15px 0 0 12px;
}
.barleft input{
  width: 20px;
  height: 20px;
  vertical-align:bottom;
}
.barcenter{
  width: 50%;
  line-height: 50px;
padding-left: 15px;
}
.barright{
  width: 30%;
  line-height: 50px;
  text-align: center;
  background-color: red;
  color: #fff;
  }
</style>