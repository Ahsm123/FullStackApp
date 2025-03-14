import { getDB } from "../config/db.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const db = getDB();
    const products = await db.collection("products").find({}).toArray();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const db = getDB();
    const product = await db
      .collection("products")
      .findOne({ id: req.params.productId });
    res.json(product);
  } catch (error) {
    next(error);
  }
};
