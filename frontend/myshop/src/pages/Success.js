import React from "react";
import { Link } from "react-router-dom";

function Success() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Order Successful 🎉</h1>
      <p>Your order has been placed successfully.</p>

      <Link to="/">
        <button
          style={{
            padding: "10px 20px",
            background: "blue",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          Continue Shopping
        </button>
      </Link>
    </div>
  );
}

export default Success;
