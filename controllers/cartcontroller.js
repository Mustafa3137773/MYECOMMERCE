import Cart from "../models/cartmodel.js";

// =========================
//  GET CART BY USER ID
// =========================
export const getCart = async (req, res) => {
  try {
    const userId = req.params.userId;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.json({
        message: "Cart fetched",
        cart: { items: [] }
      });
    }

    res.json({
      message: "Cart fetched",
      cart
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching cart",
      error: error.message
    });
  }
};

// =========================
//  ADD TO CART
// =========================
export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity }]
      });
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();

    res.json({ message: "Item added to cart" });
  } catch (error) {
    res.status(500).json({
      message: "Error adding item",
      error: error.message
    });
  }
};

// =========================
//  REMOVE ITEM FROM CART
// =========================
export const removeItem = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();

    res.json({ message: "Item removed" });
  } catch (error) {
    res.status(500).json({
      message: "Error removing item",
      error: error.message
    });
  }
};
