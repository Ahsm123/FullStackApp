import axios from "axios";

export async function getProducts() {
  const response = await axios.get("/api/products");
  return response.data;
}

export async function getProductById(productId) {
  const response = await axios.get(`/api/products/${productId}`);
  return response.data;
}
