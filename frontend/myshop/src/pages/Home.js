import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    axios.get("http://localhost:5000/api/products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  // ⭐ Extract unique categories
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // ⭐ Filter products by category + search
  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;

    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ padding: "40px" }}>
      <h1>Products</h1>

      {/* ⭐ SEARCH BAR */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "300px",
          padding: "12px",
          marginTop: "20px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      {/* ⭐ CATEGORIES BAR */}
      <div style={{ marginTop: "20px", display: "flex", gap: "15px" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: "8px 16px",
              borderRadius: "5px",
              border: "1px solid black",
              background: selectedCategory === cat ? "black" : "white",
              color: selectedCategory === cat ? "white" : "black",
              cursor: "pointer",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ⭐ PRODUCT GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {filteredProducts.map((product) => (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div
              style={{
                border: "1px solid #ccc",
                padding: "20px",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{ width: "100%", borderRadius: "10px" }}
              />
              <h3>{product.name}</h3>
              <p>AED {product.price}</p>
              <p style={{ color: "gray", fontSize: "14px" }}>
                {product.category}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
