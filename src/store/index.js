import { createStore } from 'vuex'

export default createStore({
  state: {
    cartlist: [],
  },
  mutations: {
    addcounter(state, payload) {
      payload.count++
    },
    addtocart(state, payload) {
      state.cartlist.push(payload)

    }

  },
  actions: {
    addCart(context, payload) {
      return new Promise((resolve, reject) => {
        let oldProduct = null
        for (let item of context.state.cartlist) {
          if (item.iid == payload.iid) {
            oldProduct = item
          }
        }
        if (oldProduct) {
          // oldProduct.count += 1
          context.commit('addcounter', oldProduct)
          resolve('商品数量+1')
        } else {
          payload.count = 1
            // context.state.cartlist.push(payload)
          context.commit('addtocart', payload)
          payload.checked = true
          resolve('商品添加成功')
        }
      })
    },
  },
  modules: {}
})