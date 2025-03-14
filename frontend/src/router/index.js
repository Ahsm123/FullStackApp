import { createRouter, createWebHistory } from "vue-router";
import ShoppingCartPage from "@/pages/ShoppingCartPage.vue";
import ProductsPage from "@/pages/ProductsPage.vue";
import ProductDetailPage from "@/pages/ProductDetailPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";

const routes = [
  { path: "/cart", component: ShoppingCartPage },
  { path: "/products", component: ProductsPage },
  { path: "/products/:productId", component: ProductDetailPage },
  { path: "/", redirect: "/products" },
  { path: "/:pathMatch(.*)*", component: NotFoundPage },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
