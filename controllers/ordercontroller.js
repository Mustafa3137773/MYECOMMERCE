import Order from "../models/Order.js";
import Cart from "../models/cart.js";   // IMPORTANT: lowercase 'c'

export const placeOrder = async (req, res) => {
  try {
    const { userId } = req.body;

    // Fetch user's cart
    const cart = await Cart.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total amount (replace with real product prices later)
    const totalAmount = cart.items.reduce((sum, item) => {
      return sum + item.quantity * 1; // temporary price = 1
    }, 0);

    // Create order
    const order = new Order({
      userId,
      items: cart.items,
      totalAmount,
      createdAt: new Date()
    });

    await order.save();

    // Clear cart after placing order
    cart.items = [];
    await cart.save();

    res.json({
      message: "Order placed successfully",
      order
    });

  } catch (err) {
    res.status(500).json({
      error: "Failed to place order",
      details: err.message
    });
  }
};
