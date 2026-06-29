import Order from "../models/Order.js";
import Cart from "../models/cartmodel.js"; 
import Product from "../models/Product.js";   // fetch real product data

export const placeOrder = async (req, res) => {
  try {
    const { userId } = req.body;

    // Fetch user's cart
    const cart = await Cart.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Build order items with real product data
    let orderItems = [];
    let totalAmount = 0;

    for (const item of cart.items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          message: `Product not found: ${item.productId}`
        });
      }

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        productId: item.productId,
        name: product.name,
        price: product.price,
        quantity: item.quantity
      });
    }

    // Create order
    const order = new Order({
      userId,
      items: orderItems,
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
