import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    profilepic: null, 
    theme: "light",
    notification: true,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("theme", formData.theme);
      formDataToSend.append("notification", formData.notification);
      
      if (formData.profilepic) {
        formDataToSend.append("profilepic", formData.profilepic);
      }
      console.log([...formDataToSend.entries()]);

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setSuccess(response.data.message);
      alert("Registration successful! You can now log in.");
      window.location.href = "/login"; // Redirect to login page
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
    console.log(formData)
  };

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('./dd.jpg')" }}
    >
      <div className="w-full max-w-md shadow-md p-6 bg-white rounded-lg">
        <h2 className="text-xl font-semibold text-center mb-4">Register</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <form onSubmit={handleRegister}>
     
          <div className="flex flex-col mb-4">
            <label className="mb-1 text-gray-600">Username</label>
            <input
              type="text"
              name="username"
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

         
          <div className="flex flex-col mb-4">
            <label className="mb-1 text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col mb-4">
            <label className="mb-1 text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col mb-4">
            <label className="mb-1 text-gray-600">Profile Picture</label>
            <input
              type="file"
              name="profilepic"
              
              accept="image/*"
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col mb-4">
            <label className="mb-1 text-gray-600">Theme Preference</label>
            <select
              name="theme"
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.theme}
              onChange={handleChange}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              name="notification"
              checked={formData.notification}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-gray-600">Enable Notifications</label>
          </div>

       
          <button
            type="submit"
            className="w-full bg-blue-900 text-white p-2 rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
