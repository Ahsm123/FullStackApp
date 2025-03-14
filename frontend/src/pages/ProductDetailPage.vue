<template>
  <div v-if="product">
    <div class="img-wrap">
      <img :src="product.imageUrl" />
    </div>
    <div class="product-details">
      <h1>{{ product.name }}</h1>
      <h3 class="price">{{ product.price }}</h3>

      <button
        @click="addToCart"
        class="add-to-cart"
        v-if="user && !itemIsInCart"
      >
        Tilføj til kurv
      </button>
      <button class="grey-button" v-if="user && itemIsInCart">
        Varen er allerede i kurven
      </button>
      <button class="sign-in" @click="signIn" v-if="!user">
        Log ind for at tilføje til kurven
      </button>
    </div>
  </div>
  <div v-else>
    <NotFoundPage />
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from "vue";
import { useCartStore } from "@/stores/cartStore";
import { getProductById } from "@/services/productService";
import NotFoundPage from "@/pages/NotFoundPage.vue";

export default {
  name: "ProductDetailPage",
  props: ["user"],
  setup(props) {
    const product = ref(null);
    const cartStore = useCartStore();

    onMounted(async () => {
      product.value = await getProductById(props.$route.params.productId);
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

    const itemIsInCart = computed(() =>
      cartStore.cartItems.some(
        (item) => item.id === props.$route.params.productId
      )
    );

    const addToCart = async () => {
      await cartStore.addItem(props.user.uid, props.$route.params.productId);
      alert("Varen blev tilføjet til kurven!");
    };

    return { product, itemIsInCart, addToCart };
  },
  components: { NotFoundPage },
};
</script>
