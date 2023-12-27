import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("https://weekchallengemernbackend.vercel.app/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (response.ok) {
        // Store token in local storage
        const { token } = await response.json();
        localStorage.setItem("token", token);

        // Redirect to the dashboard after successful login
        navigate("/dashboard");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-md w-96">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Login</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-1" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleInputChange}
              className="w-full border-gray-300 border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-600 text-sm mb-1"
              htmlFor="password"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleInputChange}
              className="w-full border-gray-300 border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-md py-2 transition duration-300 hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex space-x-4 mt-4">
          <button
            onClick={() => navigate("/")}
            className="w-1/2 bg-blue-500 text-white rounded-md py-2 transition duration-300 hover:bg-blue-600"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="w-1/2 bg-gray-500 text-white rounded-md py-2 transition duration-300 hover:bg-gray-600"
          >
            SignUp
          </button>
        </div>

      
      </div>
    </div>
  );
};

export default Login;
