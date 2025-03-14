import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "../assets")));
app.use(
  express.static(path.resolve(__dirname, "../dist"), {
    maxAge: "1y",
    etag: false,
  })
);

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.use(errorHandler);

const PORT = process.env.PORT || 8082;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
