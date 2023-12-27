import React from "react";
import { useNavigate } from "react-router-dom";

const LoginSignupDashboard = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-md sm:w-96 md:w-2/3 lg:w-1/2 xl:w-1/3">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Welcome to the Dashboard
        </h2>

        <div className="flex flex-col sm:flex-row">
          <button
            className="w-full sm:w-1/2 bg-blue-500 text-white rounded-md py-2 mb-2 sm:mb-0 sm:mr-2 transition duration-300 hover:bg-blue-600"
            onClick={handleLoginClick}
          >
            Login
          </button>
          <button
            className="w-full sm:w-1/2 bg-green-500 text-white rounded-md py-2 transition duration-300 hover:bg-green-600"
            onClick={handleSignupClick}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupDashboard;
