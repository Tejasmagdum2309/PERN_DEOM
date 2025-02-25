import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
const Login = () => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();

  const submitForm = async ()=>{

    if (!email.trim() || !password.trim()) {
      toast.error("Email and Password cannot be empty...");  // Correct syntax
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password },
        { withCredentials: true } // Ensures cookies are sent if using httpOnly cookies
      );

      console.log(response)

      if (response.data.token) {
        localStorage.setItem("token", response.data.token); // Store token
        toast.success("Login successful!");
        navigate("/dashboard"); // Redirect to dashboard after login
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // Handle Axios errors
        toast.error(error.response?.data?.message || "Login failed!");
      } else {
        // Handle generic errors
        toast.error("An unexpected error occurred.");
      }
    }
    
  }

  return (
    <div className="flex items-center justify-center h-screen w-full bg-[#5C218B]">
 <div className="bg-white p-8 rounded-lg shadow-lg w-[30%] flex flex-col items-center">
  <img src="images/New_TS_Logo_page-0001 1 2.png" className="w-[220px]" alt="" />
  <p className="text-center text-gray-500 mb-10">Welcome to TableSprint admin</p>
  <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-3 mb-3 border border-gray-300 rounded" />
  <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border border-gray-300 rounded" />

  {/* Wrapped forget password inside div */}
  <div className="w-full text-end mb-14">
    <p className="text-[#5C218B] cursor-pointer">Forget your password?</p>
  </div>

  <button className="w-full bg-[#5C218B] text-white py-2 rounded hover:bg-[#4a1975]" onClick={submitForm}>Login</button>
</div>

</div>

  )
}

export default Login