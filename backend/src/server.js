import express from "express";
import { MongoClient } from "mongodb";
import {
  cartItems as cartItemsRaw,
  products as productsRaw,
} from "./temp-data";

let cartItems = cartItemsRaw;
let products = productsRaw;

const url = `mongodb+srv://andershsm:BJ0YCrOZ43ZfhFN0@fullstackapp.ovs7h.mongodb.net/?retryWrites=true&w=majority&appName=FullStackApp`;
const client = new MongoClient(url);

const app = express();
app.use(express.json());

app.get("/products", async (req, res) => {
  await client.connect();
  const db = client.db("fsa-db");
  const products = await db.collection("products").find({}).toArray();
  res.json(products);
});

function populateCartIds(ids) {
  return ids.map((id) => products.find((product) => product.id === id));
}

app.get("/cart", (req, res) => {
  const populatedCart = populateCartIds(cartItems);
  res.json(populatedCart);
});

app.get("/products/:productId", (req, res) => {
  const productId = req.params.productId;
  const product = products.find((product) => product.id === productId);
  res.json(product);
});

app.post("/cart", (req, res) => {
  const productId = req.body.id;
  cartItems.push(productId);
  const populatedCart = populateCartIds(cartItems);
  res.json(populatedCart);
});

app.delete("/cart/:productId", (req, res) => {
  const productId = req.params.productId;
  cartItems = cartItems.filter((id) => id !== productId);
  const populatedCart = populateCartIds(cartItems);
  res.json(populatedCart);
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
