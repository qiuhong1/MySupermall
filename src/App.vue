<template>
  <div class="main">
    <router-view v-slot="{ Component }">
      <keep-alive exclude="Detail">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <main-tab-bar></main-tab-bar>
  </div>
</template>
<script>

import MainTabBar from './components/content/mainTabbar/MainTabBar.vue'
export default {
  name:'App',
  components:{
    MainTabBar
  }
}
</script>

<style>
@import './assets/css/base.css';

</style>
