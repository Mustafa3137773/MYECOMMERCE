export const addToCart = (req, res) => {
  res.json({ message: "Item added to cart" });
};

export const getCart = (req, res) => {
  res.json({ message: "Cart fetched" });
};

export const removeItem = (req, res) => {
  res.json({ message: "Item removed from cart" });
};