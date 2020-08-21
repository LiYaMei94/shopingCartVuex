import axios from 'axios'
const state = {
    products: []
}

const mutations = {
    setProduct(state, payload) {
        state.products = payload
    }
}

const actions = {
    async getProduct(context) {
        // console.log(context)
        const { data } = await axios.get("http://127.0.0.1:3000/products");
        context.commit('setProduct', data)
    }
}

export default {
    // 使用命名空间时，不能使用this.$store.dispatch("getProduct");
    namespaced: true,
    state,
    mutations,
    actions
}