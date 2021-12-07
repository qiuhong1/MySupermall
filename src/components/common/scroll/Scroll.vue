<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
name:'Scroll',
props:{
    probeType:{
      type:Number,
      defult:0
    },
    pullUpLoad:{
      type:Boolean,
      defult:false
    }
},
data(){
  return {
    bscroll:null,
  }
},
mounted(){
  // 创建BScroll对象
   this.bscroll=new BScroll(this.$refs.wrapper,{
    probeType:this.probeType,
    click:true,
    pullUpLoad:this.pullUpLoad,
    pullDownRefresh: true
  })
  // 监听滚动位置
  this.bscroll.on('scroll',(position)=>{
    // console.log(position);
    this.$emit('positions',position)
  })
  // 监听上拉事件
  this.bscroll.on('pullingUp',()=>{
    // console.log('jiazaigengduo');
    this.$emit('pulling')
  })
}
}
</script>

<style>

</style>