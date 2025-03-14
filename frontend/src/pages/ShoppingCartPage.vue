<template>
  <h1>Shopping Cart</h1>
  <div v-if="cartStore.cartItems.length > 0">
    <ShoppingCartList
      @remove-from-cart="removeFromCart"
      :products="cartStore.cartItems"
    />
    <button class="checkout-button">Proceed to Checkout</button>
  </div>
  <div v-if="cartStore.cartItems.length === 0">
    You currently have no items in your cart!
  </div>
</template>

<script>
import { watch, onMounted } from "vue";
import { useCartStore } from "@/stores/cartStore";
import ShoppingCartList from "@/components/ShoppingCartList.vue";

export default {
  name: "ShoppingCartPage",
  props: ["user"],
  components: { ShoppingCartList },
  setup(props) {
    const cartStore = useCartStore();

    onMounted(async () => {
      if (props.user) {
        await cartStore.fetchCart(props.user.uid);
      }
    });

    watch(
      () => props.user,
      async (newUser) => {
        if (newUser) {
          await cartStore.fetchCart(newUser.uid);
        }
      }
    );

    const removeFromCart = async (productId) => {
      await cartStore.removeItem(props.user.uid, productId);
    };

    return { cartStore, removeFromCart };
  },
};
</script>
