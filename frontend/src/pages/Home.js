import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";

function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Products</h1>

      {products.length === 0 && <p>No products found</p>}

      {products.map((product) => (
        <div
          key={product._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            width: "300px",
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
          />

          <h3>{product.name}</h3>
          <p>{product.price} AED</p>

          <button
            onClick={() => addToCart(product)}
            style={{
              padding: "8px 12px",
              background: "black",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
