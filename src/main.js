import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import axios from 'axios'

createApp(App).use(store).use(router).mount('#app')

// 网络请求
// axios({
//   url: 'http://152.136.185.210:7878/api/hy66/home/multidata'
// }).then(res => {
//   console.log(res);
// })