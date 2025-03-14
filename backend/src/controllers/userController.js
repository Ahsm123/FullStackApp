import { getDB } from "../config/db.js";

const populateCartIds = async (db, ids) => {
  return Promise.all(
    ids.map((id) => db.collection("products").findOne({ id }))
  );
};

export const getUserCart = async (req, res, next) => {
  try {
    const db = getDB();
    const user = await db
      .collection("users")
      .findOne({ id: req.params.userId });
    const populatedCart = await populateCartIds(db, user?.cartItems || []);
    res.json(populatedCart);
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const db = getDB();
    const { userId } = req.params;
    const { id: productId } = req.body;

    const existingUser = await db.collection("users").findOne({ id: userId });

    if (!existingUser) {
      await db.collection("users").insertOne({ id: userId, cartItems: [] });
    }

    await db
      .collection("users")
      .updateOne({ id: userId }, { $addToSet: { cartItems: productId } });

    const user = await db.collection("users").findOne({ id: userId });
    const populatedCart = await populateCartIds(db, user?.cartItems || []);

    res.json(populatedCart);
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (req, res, next) => {
  try {
    const db = getDB();
    const { userId, productId } = req.params;

    await db
      .collection("users")
      .updateOne({ id: userId }, { $pull: { cartItems: productId } });

    const user = await db.collection("users").findOne({ id: userId });
    const populatedCart = await populateCartIds(db, user?.cartItems || []);

    res.json(populatedCart);
  } catch (error) {
    next(error);
  }
};
