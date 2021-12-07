<template>
<div class="detail">
 <nav-bar class="detailnav">
    <template v-slot:left><img src="@/assets/images/common/back.svg" alt=""  @click="backClick"></template>
    <template v-slot:center><div class="centera"><div v-for="(item,index) in navs" 
    :key="index" class="detailnavitem" 
    @click="detailClick(index)" :class="{active:chooseindex==index}">{{item}}</div></div> </template>
  </nav-bar>
  <scroll class="contentdetail" ref="sscroll" @positions="positions" :probeType="3">
    <detail-swiper :topImages="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
    <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
    <detail-param-info :paramInfo="paramInfo" ref="weisha"/>
    <detail-comment-info :commentInfo="commentInfo" ref="comments"></detail-comment-info>
    <goods-list :goods="recommend" ref="recommends"></goods-list>
  </scroll>
  <detail-nav-bar @addCart="addCart"></detail-nav-bar>
  <back-top  @click="backtopClick" v-show="isshow"></back-top>
<toast :message="message" :show="show"></toast>
</div> 
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import DetailSwiper from '@/views/detail/DetailSwiper'
import DetailBaseInfo from './DetailBaseInfo.vue'
import DetailShopInfo from './DetailShopInfo.vue'
import Scroll from '@/components/common/scroll/Scroll.vue'
import DetailGoodsInfo from './DetailGoodsInfo.vue'
import DetailParamInfo from './DetailParamInfo.vue'
import DetailCommentInfo from './DetailCommentInfo.vue'
import GoodsList from '@/components/content/goods/GoodsList'
import DetailNavBar from './DetailNavBar.vue'
import BackTop from '@/components/common/backtop/BackTop'
import Toast from '@/components/common/toast/Toast'



import {getDetail,Goods,Shop,GoodsParam,getRecommend} from '@/network/details.js'
export default {
name:'Detail',
components:{
  NavBar,
  DetailSwiper,
  DetailBaseInfo,
  DetailShopInfo,
  Scroll,
  DetailGoodsInfo,
  DetailParamInfo,
  DetailCommentInfo,
   GoodsList,
   DetailNavBar,
   BackTop,
   Toast
},
data(){
  return{
    iid:null,
    navs:['商品','参数','评论','推荐'],
    chooseindex:0,
    topImages:[],
    goods:{},
    shop:{},
    detailInfo:{},
    paramInfo:{},
    commentInfo:{},
    recommend:[],
    titletopY:[],
    scrollindex:0,
    isshow:false,
    message:'',
    show:false
  }
},
created(){
  // 保存传入的iid
  this.iid=this.$route.params.iid
  // 根据iid请求详情数据
  getDetail(this.iid).then(res=>{
    // console.log(res);
    this.topImages=res.result.itemInfo.topImages
    // console.log(res.result.itemInfo.topImages);
      // 获取商品数据
    this.goods=new Goods(res.result.itemInfo,res.result.columns,res.result.shopInfo.services)
    // 创建店铺信息
    this.shop=new Shop(res.result.shopInfo)
    // 保存商品详情数据
    this.detailInfo=res.result.detailInfo
    // 取出参数信息
    this.paramInfo=new GoodsParam(res.result.itemParams.info,res.result.itemParams.rule)
    // 取出评论信息
    if(res.result.rate.cRate!==0){
      this.commentInfo=res.result.rate.list[0]
    }
  })
  // 取出推荐页数据
  getRecommend().then(res=>{
    this.recommend=res.data.list
    // console.log(this.recommend);
  })
  this.$nextTick(()=>{
   setTimeout(() => {
      this.titletopY=[]
    this.titletopY.push(0)
    this.titletopY.push(this.$refs.weisha.$el.offsetTop)
    this.titletopY.push(this.$refs.comments.$el.offsetTop)
    this.titletopY.push(this.$refs.recommends.$el.offsetTop)
    // console.log(this.titletopY);
   }, 1000);
  })
 
},

methods:{
  imageLoad(){
    this.$refs.sscroll.bscroll.refresh();
  },
  detailClick(index){
    this.chooseindex=index
       this.titletopY=[]
    this.titletopY.push(0)
    this.titletopY.push(this.$refs.weisha.$el.offsetTop)
    this.titletopY.push(this.$refs.comments.$el.offsetTop)
    this.titletopY.push(this.$refs.recommends.$el.offsetTop)
    console.log(this.chooseindex);
    this.$refs.sscroll.bscroll.scrollTo(0,-this.titletopY[index],200)
  },
  backClick(){
    this.$router.back()
    // this.$router.push('/home')
  },
  positions(position){
    // console.log(position);
    // 获取y值
    const positionY=-position.y
    // positionY和主体中的值进行对比
      let length=this.titletopY.length
    for (let i=0;i<length;i++) {
      // console.log(i);
      // if(positionY>this.titletopY[parseInt(i)]&&
      // positionY<this.titletopY[i+1])
      // console.log(i);  
      if(this.scrollindex!==i&&((i<length-1&&positionY>=this.titletopY[i]&&
      positionY<this.titletopY[i+1])||(i===length-1&&
      positionY>=this.titletopY[i]))){
        this.scrollindex=i
        // console.log(this.scrollindex);
        this.chooseindex=this.scrollindex
      }
    }
    this.isshow=position.y<-1000
  },
  backtopClick(){
      // scrollTo是bscroll的内置属性
      this.$refs.sscroll.bscroll.scrollTo(0,0,500)
    },
  addCart(){
    // 获取购物车需要展示的信息
    const product={}
    product.image=this.topImages[0]
    product.title=this.goods.title
    // console.log(this.goods.title);
    product.desc=this.goods.desc
    product.price=this.goods.newPrice
    product.iid=this.iid
    product.realPrice=this.goods.realPrice
    // console.log(product);
    this.$store.dispatch('addCart',product).then(res=>{
      // console.log(res);
      this.show=true;
      this.message=res;
      setTimeout(() => {
        this.show=false;
      this.message='';
      }, 1500);
    })
  }
}

}

</script>

<style>
.centera{
  display: flex;
}
.detailnavitem{
  flex:1;
}
.active{
 color:var(--color-high-text)
}
.left img{
  padding: 10px;
}
.detail{
  position: relative;
  z-index: 1000;
  background-color: #fff;
  height: 100vh;
}
.contentdetail{
  height: calc(100% - 44px);
}
.detailnav{
  position: relative;
  z-index: 1001;
  background-color: #fff;
}
</style>