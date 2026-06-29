import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const { cart, setCart } = useContext(CartContext);

  const updateQty = (index, qty) => {
    const updated = [...cart];
    updated[index].qty = qty;
    setCart(updated);
  };

  const removeItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: window.innerWidth < 768 ? "column" : "row",
        padding: "20px",
        gap: "20px",
      }}
    >
      <div style={{ flex: 2 }}>
        <h1>Your Cart</h1>

        {cart.length === 0 && <p>Your cart is empty</p>}

        {cart.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              borderBottom: "1px solid #ddd",
              padding: "15px 0",
              gap: "20px",
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "120px",
                height: "120px",
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />

            <div style={{ flex: 1 }}>
              <h3>{item.name}</h3>
              <p style={{ fontWeight: "bold" }}>{item.price} AED</p>

              <select
                value={item.qty || 1}
                onChange={(e) => updateQty(index, Number(e.target.value))}
                style={{
                  padding: "5px",
                  marginRight: "10px",
                  borderRadius: "5px",
                }}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    Qty: {n}
                  </option>
                ))}
              </select>

              <button
                onClick={() => removeItem(index)}
                style={{
                  padding: "5px 10px",
                  background: "red",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
              >
                Remove
              </button>
            </div>

            <div
              style={{
                fontWeight: "bold",
                fontSize: "18px",
                minWidth: "80px",
                textAlign: "right",
              }}
            >
              {item.price * (item.qty || 1)} AED
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          flex: 1,
          border: "1px solid #ddd",
          padding: "20px",
          height: "fit-content",
          borderRadius: "5px",
        }}
      >
        <h2>Order Summary</h2>
        <p>Total Items: {cart.length}</p>
        <h3>Total: {total} AED</h3>

        <Link to="/checkout">
          <button
            style={{
              width: "100%",
              padding: "15px",
              background: "orange",
              border: "none",
              cursor: "pointer",
              fontSize: "18px",
              marginTop: "10px",
              borderRadius: "5px",
            }}
          >
            Proceed to Checkout
          </button>
        <Link to="/checkout">
  <button style={{ background: "blue", color: "white" }}>
    Proceed to Checkout
  </button>
</Link>
      </div>
    </div>
  );
}

export default Cart;
