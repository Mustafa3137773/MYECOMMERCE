import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Admin() {
  const [products, setProducts] = useState([]);

  const loadProducts = () => {
    axios.get("http://localhost:5000/api/products").then((res) => {
      setProducts(res.data);
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    await axios.delete(`http://localhost:5000/api/products/${id}`);
    loadProducts();
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Admin Panel</h1>

      <Link
        to="/admin/add"
        style={{
          padding: "10px 20px",
          background: "black",
          color: "white",
          textDecoration: "none",
          borderRadius: "5px",
        }}
      >
        Add Product
      </Link>

      <table
        style={{
          width: "100%",
          marginTop: "30px",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr style={{ background: "#f0f0f0" }}>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Image</th>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Name</th>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Price</th>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Category</th>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                <img src={p.image} alt="" width="60" />
              </td>
              <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                {p.name}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                AED {p.price}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                {p.category}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                <Link
                  to={`/admin/edit/${p._id}`}
                  style={{
                    marginRight: "10px",
                    color: "blue",
                    textDecoration: "none",
                  }}
                >
                  Edit
                </Link>

                <button
                  onClick={() => deleteProduct(p._id)}
                  style={{
                    padding: "5px 10px",
                    background: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
