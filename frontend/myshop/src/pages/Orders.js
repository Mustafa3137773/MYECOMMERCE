import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem("user");

    axios
      .get(`http://localhost:5000/api/orders/${email}`)
      .then((res) => setOrders(res.data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Orders</h1>

      {orders.length === 0 && <p>No orders found.</p>}

      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "5px",
          }}
        >
          <h3>Order ID: {order._id}</h3>
          <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
          <p>Total: AED {order.total}</p>

          <h4>Items:</h4>
          <ul>
            {order.items.map((item, index) => (
              <li key={index}>
                {item.name} — {item.quantity} × AED {item.price}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Orders;
