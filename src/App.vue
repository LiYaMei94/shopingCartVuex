<template>
  <div id="app">
    <router-view />
    <CartPanel></CartPanel>
  </div>
</template>

<script>
import CartPanel from "./components/cartPanel";

export default {
  name: "App",
  components: {
    CartPanel,
  },
};
</script>

<style>
#app {
  width: 980px;
  margin: 0 auto;
  padding: 10px;
}

.pop-cart {
  float: right;
}

.title {
  font-size: 20px;
  color: #333;
}

.el-breadcrumb {
  padding: 20px 0;
}
</style>
