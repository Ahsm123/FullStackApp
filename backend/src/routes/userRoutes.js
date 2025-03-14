import express from "express";
import {
  getUserCart,
  addToCart,
  removeFromCart,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/:userId/cart", getUserCart);
router.post("/:userId/cart", addToCart);
router.delete("/:userId/cart/:productId", removeFromCart);

export default router;
