import { defineStore } from "pinia";
import { getCart, addToCart, removeFromCart } from "@/services/cartService";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartItems: [],
  }),
  actions: {
    async fetchCart(userId) {
      this.cartItems = await getCart(userId);
    },
    async addItem(userId, productId) {
      await addToCart(userId, productId);
      this.cartItems.push({ id: productId });
    },
    async removeItem(userId, productId) {
      this.cartItems = await removeFromCart(userId, productId);
    },
  },
});
