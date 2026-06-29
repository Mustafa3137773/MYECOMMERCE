import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// =========================
// CREATE PRODUCT
// =========================
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// =========================
// GET ALL PRODUCTS
// =========================
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// =========================
// GET SINGLE PRODUCT
// =========================
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
});

// =========================
// UPDATE PRODUCT
// =========================
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// =========================
// DELETE PRODUCT
// =========================
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// =========================
// RELATED PRODUCTS
// =========================
router.get("/related/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    const related = await Product.find({
      category: product.category,
      _id: { $ne: product._id }
    }).limit(4);

    res.json(related);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch related products" });
  }
});

export default router;
