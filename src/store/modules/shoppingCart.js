import axios from 'axios'

const state = {
    products: JSON.parse(window.localStorage.getItem('cart-products')) || []
}

const mutations = {
    setCartProducts(state, payload) {
        let index = checkID(payload)
        if (index >= 0) {
            state.products.splice(index, 1, payload)
        } else {
            state.products.push(payload)
        }
    }
}

const getters = {
    totalCount({ products }) {
        return products.reduce((sum, item) => sum + item.count, 0)
    },
    totalPrice({ products }, { countCheck }) {
        let price = products.reduce((sum, item) => sum + item.price * item.count, 0)
        return countCheck ? price.toFixed(2) : 0
    },
    countCheck({ products }) {
        return products.length > 0
    },
    checkedPrice({ products }, { countCheck }) {
        let price = products.reduce((sum, item) => sum + (item.checked ? item.price * item.count : 0), 0)
        return countCheck ? price.toFixed(2) : 0
    },
    checkedCount({ products }) {
        return products.reduce((sum, item) => sum + (item.checked ? item.count : 0), 0)
    }

}

const actions = {
    async getCartProducts(context) {
        const { data } = await axios.get("http://127.0.0.1:3000/cartProducts");
        if (data.length !== 0) {
            context.state.products = data
        }
    },
    async addToCart(context, product) {
        const { data } = await axios.post("http://127.0.0.1:3000/addCartProducts", { product: product });
        mutations.setCartProducts(context.state, data);
    },
    async deleteFromCart(context, id) {
        const { data } = await axios.post("http://127.0.0.1:3000/deleteCartProducts", { id: id });
        context.state.products.splice(data.index, 1)
    },
    async updateCartProducts(context, params) {
        const { data } = await axios.post("http://127.0.0.1:3000/updateCartProducts", { ...params, type: 'count' });
        context.state.products.splice(data.index, 1, data.data)
    },
    async updateAllProductChecked(context, params) {
        const { data } = await axios.post("http://127.0.0.1:3000/updateCartProducts", { ...params, type: 'checked', isAllProduct: true });
        context.state.products = data.data
    },
    async updateProductChecked(context, params) {
        const { data } = await axios.post("http://127.0.0.1:3000/updateCartProducts", { ...params, type: 'checked', isAllProduct: false });
        context.state.products.splice(data.index, 1, data.data)
    }
}

function checkID(data) {
    const products = state.products
    let index = products.findIndex(item => item.id === data.id)
    return index
}


export default {
    // 使用命名空间时，不能使用this.$store.dispatch("getProduct");
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}