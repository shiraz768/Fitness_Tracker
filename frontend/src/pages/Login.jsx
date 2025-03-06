import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate(); // Hook for redirection
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Instead of storing a token, store the user data
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Server error. Try again.");
    }
  };

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat" 
      style={{ backgroundImage: "url('./dd.jpg')" }}
    >
      <div className="w-full max-w-sm shadow-md p-6 bg-white rounded-lg">
        <h2 className="text-xl font-semibold text-center mb-4">Login</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="flex flex-col mb-4">
            <label className="mb-1 text-gray-600">Enter your email</label>
            <input
              type="email"
              name="email"
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col mb-4">
            <label className="mb-1 text-gray-600">Enter your password</label>
            <input
              type="password"
              name="password"
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="w-full bg-blue-900 text-white p-2 rounded-lg hover:bg-blue-700 transition">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
