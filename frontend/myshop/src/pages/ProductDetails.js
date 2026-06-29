import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`).then((res) => {
      setProduct(res.data);
    });

    axios
      .get(`http://localhost:5000/api/products/related/${id}`)
      .then((res) => setRelated(res.data));
  }, [id]);

  if (!product) return <h2 style={{ padding: "20px" }}>Loading...</h2>;

  return (
    <div style={{ padding: "40px" }}>
      {/* MAIN PRODUCT */}
      <div style={{ display: "flex", gap: "40px" }}>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: "350px", borderRadius: "10px" }}
        />

        <div>
          <h1>{product.name}</h1>
          <h2 style={{ color: "green" }}>AED {product.price}</h2>

          <p style={{ marginTop: "20px", fontSize: "18px" }}>
            {product.description || "No description available."}
          </p>

          <button
            onClick={() => addToCart(product)}
            style={{
              marginTop: "20px",
              padding: "12px 25px",
              background: "black",
              color: "white",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* ⭐ RELATED PRODUCTS */}
      <h2 style={{ marginTop: "50px" }}>Related Products</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {related.map((item) => (
          <Link
            key={item._id}
            to={`/product/${item._id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "100%", borderRadius: "10px" }}
              />
              <h4>{item.name}</h4>
              <p style={{ color: "green" }}>AED {item.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductDetails;
