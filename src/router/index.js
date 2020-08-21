import Vue from 'vue'
import VueRouter from 'vue-router'
import Product from '@/pages/product/product.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Product',
    component: Product
  },
  {
    path: '/cart',
    name: 'ShoppingCart',
    component: () => import(/* webpackChunkName: "about" */ '@/pages/shoppingCart/shoppingCart.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
