import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
const Login = () => {
  const navigate = useNavigate(); // Hook for redirection
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
  
      console.log("Server Response:", response); // ✅ Debugging log
  
      const { user } = response.data; 
  
      if (!user || !user._id) {
        setError("User ID is missing from response");
        return;
      }
  
      localStorage.setItem("userId", user._id);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
    } catch (err) {
      console.error("Login Error:", err); // ✅ Log detailed error
  
      if (err.response) {
        console.log("Error Response Data:", err.response.data);
        console.log("Error Status:", err.response.status);
        console.log("Error Headers:", err.response.headers);
        setError(err.response.data.message || "Invalid credentials");
      } else if (err.request) {
        console.log("No Response Received:", err.request);
        setError("No response from");
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
