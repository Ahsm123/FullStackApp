<template>
  <div class="nav-bar">
    <router-link to="/products" class="products-link">
      <div class="logo-wrap">
        <img :src="logo" />
      </div>
    </router-link>
    <div class="nav-buttons-wrap">
      <button @click="signOut" v-if="user">Log ud</button>
      <router-link to="/cart">
        <button>Shopping Cart</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { logout } from "@/services/authService";
import logo from "@/assets/pizza-logo.png";

export default {
  name: "NavBar",
  props: ["user"],
  setup() {
    return {
      logo,
      signOut: logout,
    };
  },
};
</script>
