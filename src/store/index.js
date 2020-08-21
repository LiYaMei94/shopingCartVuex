import Vue from 'vue'
import Vuex from 'vuex'
import product from './modules/product.js'
import shoppingCart from './modules/shoppingCart'
Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        product,
        shoppingCart
    }
})