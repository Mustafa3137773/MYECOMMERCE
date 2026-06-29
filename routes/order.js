import express from "express";
import { placeOrder } from "../controllers/ordercontroller.js";

const router = express.Router();

// PLACE ORDER
router.post("/place", placeOrder);

export default router;
