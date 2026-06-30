import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// ROUTES
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/order.js";   // NEW ORDER ROUTE

dotenv.config();

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// MONGODB CONNECTION
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// ROUTES MOUNTING
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);   // NEW ORDER SYSTEM

// ROOT TEST ROUTE
app.get("/", (req, res) => {
  res.send("MYECOMMERCE Backend Running");
});

// START SERVER
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
