import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    console.log("Login Attempt:", { email, password });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Login Success:", response.data);

      const { user } = response.data;
      if (!user || !user._id) {
        setError("User ID is missing from response");
        return;
      }
      login(user);
      navigate("/dashboard", { replace: true });

    } catch (err) {
      console.error("Login Error:", err);
      if (err.response) {
        console.log("Error Response Data:", err.response.data);
        setError(err.response.data?.message || "Invalid credentials");
      } else if (err.request) {
        console.log("No Response Received:", err.request);
        setError("No response from server. Please try again later.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
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
              autoComplete="username"
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
              autoComplete="current-password"
            />
          </div>

          <button className="w-full bg-blue-900 text-white p-2 rounded-lg hover:bg-blue-700 transition">
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600 mb-2">Don't have an account?</p>
          <button
            onClick={() => navigate("/register")}
            className="w-full bg-blue-900 text-white p-2 rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
