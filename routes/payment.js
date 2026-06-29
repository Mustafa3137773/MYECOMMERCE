console.log("Stripe Key Loaded:", process.env.STRIPE_SECRET_KEY);
import express from "express";
import Stripe from "stripe";

const router = express.Router();

// Stripe secret key from .env
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
  try {
    const { cart } = req.body;

    const lineItems = cart.map((item) => ({
      price_data: {
        currency: "aed",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cart",
    });

    res.json({ url: session.url });
  } catch (error) {
    console.log("Stripe Error:", error);
    res.status(500).json({ error: "Payment failed" });
  }
});

export default router;
