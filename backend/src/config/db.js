import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGO_URI;
const client = new MongoClient(url, {
  tls: true,
});

let db;

export async function connectDB() {
  await client.connect();
  db = client.db(process.env.DB_NAME);
  console.log("MongoDB Connected");
}

export function getDB() {
  if (!db) throw new Error("Database not initialized");
  return db;
}
