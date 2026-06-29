import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();
  const userId = "123"; // temporary until login system is added

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const [shipping, setShipping] = useState({
    fullName: "",
    address: "",
    city: "",
    phone: ""
  });

  const [paymentMethod, setPaymentMethod] = useState("Cash");

  // Fetch cart items
  useEffect(() => {
    axios
      .get(`https://mycommerce-backend-33ru.onrender.com/api/cart/${userId}`)
      .then((res) => {
        setCart(res.data.items);
        setTotal(res.data.totalAmount);
      })
      .catch((err) => console.log(err));
  }, []);

  const placeOrder = async () => {
    try {
      await axios.post(
        "https://mycommerce-backend-33ru.onrender.com/api/orders/place",
        {
          userId,
          shipping,
          paymentMethod
        }
      );

      navigate("/success");
    } catch (err) {
      console.log(err);
      alert("Failed to place order");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Checkout</h1>

      <h2>Your Items</h2>
      {cart.map((item) => (
        <div key={item.productId} style={{ marginBottom: "10px" }}>
          <p><strong>{item.name}</strong></p>
          <p>Price: {item.price} AED</p>
          <p>Quantity: {item.quantity}</p>
        </div>
      ))}

      <h2>Total: {total} AED</h2>

      <hr />

      <h2>Shipping Details</h2>
      <input
        type="text"
        placeholder="Full Name"
        value={shipping.fullName}
        onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })}
      />
      <br /><br />

      <input
        type="text"
        placeholder="Address"
        value={shipping.address}
        onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
      />
      <br /><br />

      <input
        type="text"
        placeholder="City"
        value={shipping.city}
        onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
      />
      <br /><br />

      <input
        type="text"
        placeholder="Phone Number"
        value={shipping.phone}
        onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
      />
      <br /><br />

      <h2>Payment Method</h2>
      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <option value="Cash">Cash on Delivery</option>
        <option value="Card">Credit / Debit Card</option>
      </select>

      <br /><br />

      <button
        onClick={placeOrder}
        style={{
          padding: "10px 20px",
          background: "green",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        Place Order
      </button>
    </div>
  );
}

export default Checkout;
