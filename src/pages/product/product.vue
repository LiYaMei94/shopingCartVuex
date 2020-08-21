<template>
  <div class="product_wrap">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item><a href="#/">首页</a></el-breadcrumb-item>
      <el-breadcrumb-item><a href="#/">商品列表</a></el-breadcrumb-item>
    </el-breadcrumb>
    <!-- <el-table :data="$store.state.product.products" style="width: 100%"> -->
    <el-table :data="productList" style="width: 100%">
      <el-table-column prop="title" label="商品"> </el-table-column>
      <el-table-column prop="price" label="价格"> </el-table-column>
      <el-table-column prop="address" label="操作">
        <template v-slot="scope">
          <el-button @click="addToCart(scope.row)">加入购物车</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import axios from "axios";
export default {
  name: "Product",
  data() {
    return {};
  },
  computed: {
    ...mapState("product", { productList: "products" }),
  },
  methods: {
    ...mapActions("product", ["getProduct"]),
    addToCart(item) {
      axios
        .post("http://127.0.0.1:3000/updateCartProducts", { product: item })
        .then((res) => {
          console.log(res);
          this.setCartProducts(res.data);
        });
    },
    ...mapMutations("shoppingCart", ["setCartProducts"]),
  },
  created() {
    //   获取商品列表
    // this.$store.dispatch("getProduct");
    this.getProduct();
  },
};
</script>

<style scoped>
@import "./product.css";
</style>
