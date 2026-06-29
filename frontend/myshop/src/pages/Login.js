import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    // ⭐ Save user email in localStorage
    localStorage.setItem("user", email);

    // Redirect to checkout
    navigate("/checkout");
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          padding: "12px",
          width: "280px",
          marginTop: "20px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      <br />

      <button
        onClick={handleLogin}
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
        Login
      </button>
    </div>
  );
}

export default Login;
