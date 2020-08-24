import Vue from 'vue'
import Vuex from 'vuex'
import product from './modules/product.js'
import shoppingCart from './modules/shoppingCart'
Vue.use(Vuex)

// const myPlugin = store => {
//     // store.subscribe：订阅每个store中的mutation，接收的回调函数会在每个mutation完成之后调用
//     store.subscribe((mutation, state) => {
//         // 每次mutation之后调用
//         if (mutation.type.startsWith('shoppingCart/')) {
//             window.localStorage.setItem('cart-products', JSON.stringify(state.shoppingCart.products))
//         }
//     })
// }
export default new Vuex.Store({
    modules: {
        product,
        shoppingCart
    },
    // plugins: [myPlugin]
})