import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// ROUTES
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/order.js";
import paymentRoutes from "./routes/payment.js";

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// DATABASE CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// ROUTES
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);

// SERVER START
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
