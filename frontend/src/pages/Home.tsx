import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-[#5C218B] text-white">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[40%] flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold text-[#5C218B] mb-4">Welcome to TableSprint</h1>
        <p className="text-gray-600 mb-6">
          Use the following credentials to login or create your own account.
        </p>

        {/* Credentials */}
        <div className="bg-gray-100 p-4 rounded-md text-gray-800 w-full text-left">
          <p><b>Email:</b> magdumtej1008@gmail.com</p>
          <p><b>Password:</b> Tej10008@</p>
        </div>

        {/* Navigate to Login Page */}
        <button 
          className="mt-6 bg-[#5C218B] text-white px-6 py-2 rounded hover:bg-[#4a1975] transition"
          onClick={() => navigate("/login")}
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default Home;
