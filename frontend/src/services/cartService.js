import axios from "axios";

export async function getCart(userId) {
  const response = await axios.get(`/api/users/${userId}/cart`);
  return response.data;
}

export async function addToCart(userId, productId) {
  await axios.post(`/api/users/${userId}/cart`, { id: productId });
}

export async function removeFromCart(userId, productId) {
  const response = await axios.delete(`/api/users/${userId}/cart/${productId}`);
  return response.data;
}
