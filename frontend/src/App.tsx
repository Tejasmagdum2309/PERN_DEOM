import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./pages/login.tsx";
// import react-router-dom
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar.tsx";
import Home from "./pages/Home.tsx";
import Category from "./pages/Category.tsx";
import UpdateCategory from "./pages/UpdateCategory.tsx";
import SubcategoriesTable from "./pages/SubCategory.tsx";
import UpdateSubcategory from "./pages/UpdateSubCategory.tsx";
import DashBoard from "./pages/DashBoard.tsx";
import CreateCategory from "./pages/AddCategory.tsx";
import CreateSubcategory from "./pages/AddSubCategory.tsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route element={<Navbar />}>
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/category" element={<Category />} />
            <Route path="/update-category/:id" element={<UpdateCategory />} />
            <Route path="/subCategory" element={<SubcategoriesTable />} />
            <Route
              path="/update-subCategory/:id"
              element={<UpdateSubcategory />}
            />
            <Route path="add-category" element={<CreateCategory/>} />
            <Route path="add-subcategory" element={<CreateSubcategory/>} />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
