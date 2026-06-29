import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 25px",
        background: "black",
        color: "white",
        alignItems: "center",
      }}
    >
      {/* LEFT SIDE */}
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>
        <h2>MyStore</h2>
      </Link>

      {/* RIGHT SIDE */}
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link to="/cart" style={{ color: "white", textDecoration: "none" }}>
          Cart
        </Link>

        <Link to="/orders" style={{ color: "white", textDecoration: "none" }}>
          My Orders
        </Link>

        {/* SHOW USER + LOGOUT */}
        {user ? (
          <>
            <span style={{ fontWeight: "bold", color: "#00ff99" }}>
              {user}
            </span>

            <button
              onClick={handleLogout}
              style={{
                padding: "6px 12px",
                background: "red",
                color: "white",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
