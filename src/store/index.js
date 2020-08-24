import Vue from 'vue'
import Vuex from 'vuex'
import product from './modules/product.js'
import shoppingCart from './modules/shoppingCart'
Vue.use(Vuex)

const myPlugin = store => {
    store.subscribe((mutation, state) => {
        console.log(mutation)
        console.log(state.shoppingCart.products)
        if (mutation.type.startsWith('shoppingCart/')) {
            window.localStorage.setItem('cart-products', JSON.stringify(state.shoppingCart.products))
        }
    })
}
export default new Vuex.Store({
    modules: {
        product,
        shoppingCart
    },
    plugins: [myPlugin]
})