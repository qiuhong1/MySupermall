<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>购物街</template>     
    </nav-bar>
    <tab-control ref="tab1" :titles="['流行','新款','精选']" @tabClick="tabClick" class="navcontrol" v-show="istabshow"/>
    <scroll class="content-more" ref="mscroll" 
    :probeType="3" 
    @positions="scrollposition"
    :pullUpLoad="true"
    @pulling="loadmore">
      <home-swiper @swiperImageLoad="swiperImageLoad" :banners="banners"/>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control ref="tab2" :titles="['流行','新款','精选']" @tabClick="tabClick"/>
      <goods-list  :goods="showGoods"></goods-list>
    </scroll>
    <back-top  @click="backtopClick" v-show="isshow"></back-top>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import HomeSwiper from './childcomponents/HomeSwiper.vue'
import RecommendView from './childcomponents/RecommendView.vue'
import FeatureView from './childcomponents/FeatureView.vue'
import TabControl from '@/components/common/tabcontrol/TabControl'
import GoodsList from '@/components/content/goods/GoodsList'
import Scroll from '@/components/common/scroll/Scroll'
import BackTop from '@/components/common/backtop/BackTop'

import {getHomeMultidata,getHomeGoods} from '@/network/home.js'
// import Swiper from '@/components/common/swiper/Swiper.vue'
// import SwiperItem from '../../components/common/swiper/SwiperItem.vue'
export default {
  name:'home',
  components:{
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data(){
    return{
      // 存贮请求过来的数据res
      banners:[],
      recommends:[],
      pop:[],
      new:[],
      sell:[],
      // 设计数据结构保存数据
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      // 记录tabcontrol点击
      currenttype:'pop',
      isshow:false,
      taboffsettop:0,
      istabshow:false
    }
  },
  computed:{
    showGoods(){
       return this.goods[this.currenttype].list
    }
  },
  created(){
    // 请求多个数据  避免在created创建意识用函数在method创建
    // getHomeMultidata().then(res=>{
    //     this.banners=res.data.banner.list;
    //     this.recommends=res.data.recommend.list;
    //   })
    this.getHomeMultidata(),
    //请求home商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('sell')
    this.getHomeGoods('new')
  },
  methods:{
    // 网络请求
    getHomeMultidata(){
      getHomeMultidata().then(res=>{
        // console.log(res)
        this.banners=res.data.banner.list;
        this.recommends=res.data.recommend.list;
      }) 
    },
    getHomeGoods(type){
        const page=this.goods[type].page+1
        getHomeGoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page+=1
          // .finishPullUp当上拉加载数据加载完毕后，需要调用此方法告诉 better-scroll 数据已加载
          this.$refs.mscroll.bscroll.finishPullUp()
      })
    },
    // 事件监听
    tabClick(index){
      switch(index){
        case 0:
          this.currenttype='pop'
          break
        case 1:
          this.currenttype='new'
          break
        case 2:
          this.currenttype='sell'
          break
      }
      // 使两个tabcontrol的item显示一致
      this.$refs.tab1.currentindex = index;
      this.$refs.tab2.currentindex = index;
    },
    backtopClick(){
      // scrollTo是bscroll的内置属性
      this.$refs.mscroll.bscroll.scrollTo(0,0,500)
    },
    scrollposition(position){
      // console.log(position);
      // 判断backtop是否显示
      this.isshow=position.y<-1000
      // 决定tabcoutrol是否吸顶
      this.istabshow=-position.y>this.taboffsettop
    },
    loadmore(){
      // console.log('more');
       this.getHomeGoods(this.currenttype)
      this.$refs.mscroll.bscroll.refresh()
    },
    swiperImageLoad(){
      this.taboffsettop=this.$refs.tab2.$el.offsetTop;
    }
  },
  // mounted(){
    // console.log(this.$refs.tab.$el.offsetTop);
  // }
}
</script>

<style>
#home{
  height: 100vh;
  position: relative;
}
.home-nav{
  background-color:var(--color-tint);
  color:#fff;
}

.content-more{
overflow: hidden;
position: absolute;
top: 44px;
bottom: 49px;
left: 0;
right: 0;
}
/* .content-more{
  margin-top: 44px;
  height: calc(100% - 93px);
  overflow: hidden;
} */
.navcontrol{
  z-index: 999;
  position: fixed;
  top: 43px;
  right: 0;
  left: 0;
  background-color: #fff;
}
</style>