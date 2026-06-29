import express from "express";
import { addToCart, getCart, removeItem } from "../controllers/cartcontroller.js";

const router = express.Router();

// =========================
//  GET CART BY USER ID
// =========================
router.get("/:userId", getCart);

// =========================
//  ADD TO CART
// =========================
router.post("/add", addToCart);

// =========================
//  REMOVE ITEM FROM CART
// =========================
router.post("/remove", removeItem);

export default router;
