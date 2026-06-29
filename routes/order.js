import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// SAVE ORDER
router.post("/add", async (req, res) => {
  try {
    const { userEmail, items, total } = req.body;

    const order = new Order({
      userEmail,
      items,
      total,
    });

    await order.save();
    res.json({ message: "Order saved", order });
  } catch (err) {
    res.status(500).json({ error: "Failed to save order" });
  }
});

// GET USER ORDERS
router.get("/:email", async (req, res) => {
  try {
    const orders = await Order.find({ userEmail: req.params.email }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

export default router;
