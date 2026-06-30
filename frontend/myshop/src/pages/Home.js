import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Products</h1>

      {products.length === 0 && <p>No products found</p>}

      {products.map(product => (
        <div key={product._id} style={{
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "10px",
          width: "300px"
        }}>
          <img 
            src={product.image} 
            alt={product.name} 
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
          />
          <h3>{product.name}</h3>
          <p>Price: {product.price} AED</p>
          <button>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default Home;
