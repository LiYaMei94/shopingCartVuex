import axios from 'axios'

const state = {
    products: []
}

const mutations = {
    setCartProducts(state, payload) {
        payload['count'] = payload['count'] ? payload['count'] : 1
        state.products.push(payload)
    }
}

const getters = {
    totalCount({ products }) {
        return products.length || 0
    },
    totalPrice({ products }, { countCheck }) {
        let price = products.reduce((total, currentValue) => total + currentValue.price, 0)
        return countCheck ? price.toFixed(2) : 0
    },
    countCheck({ products }) {
        return products.length > 0
    }
}

const actions = {
    async getCartProducts(context) {
        // console.log(context)
        const { data } = await axios.get("http://127.0.0.1:3000/cartProducts");
        if (data.length !== 0) {
            context.commit('setCartProducts', ...data)
        }
    },

}




export default {
    // 使用命名空间时，不能使用this.$store.dispatch("getProduct");
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}