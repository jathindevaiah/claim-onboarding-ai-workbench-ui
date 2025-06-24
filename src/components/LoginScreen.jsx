import React, { useState } from "react";

const validUsers = [
  { username: "user1", password: "password1" },
  { username: "user2", password: "password2" },
];

const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const found = validUsers.find((u) => u.username === username && u.password === password);
    if (found) {
      setError("");
      onLogin(username);
    } else {
      setError("Invalid username or password");
    }
  };

  const handleCancel = () => {
    setUsername("");
    setPassword("");
    setError("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // Delightful gradient background, or use a background image:
        background: "linear-gradient(135deg, #4e73df 0%, #36b9cc 100%)",
        // Uncomment below and provide a relevant image URL for an image background:
        backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.95)",
          padding: 32,
          borderRadius: 12,
          boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
          minWidth: 500,
          maxWidth: 500,
        }}
      >
        <h3 className="mb-4 text-center" style={{ color: "#23395d" }}>
          Login
        </h3>
        <input className="form-control mb-3" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input className="form-control mb-3" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <div className="text-danger mb-2">{error}</div>}
        <div className="d-flex justify-content-end">
          <button className="btn btn-secondary me-2" onClick={handleCancel}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
