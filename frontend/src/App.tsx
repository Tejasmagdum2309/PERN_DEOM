import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/login.tsx';
// import react-router-dom
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar.tsx';
import Home from './pages/Home.tsx'
function App() {
  const hideNavbarPaths = ["/", "/login"];
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
    <BrowserRouter>
    <ToastContainer position="top-right" autoClose={3000} />

    {shouldShowNavbar && <Navbar />}
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<h1>About</h1>} />
        <Route path="/contact" element={<h1>Contact</h1>} />
        <Route path="/login" element={<Login />} />
      </Routes></BrowserRouter>
    </>
  )
}

export default App
