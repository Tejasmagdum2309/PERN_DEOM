import React, { useState } from "react";
import { User } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("User logged out!");
    localStorage.clear();
    navigate("/");
    setOpen(false);
  };

  return (
    <>
      {/* Horizontal Navbar */}
      <div className="bg-[#662671] flex justify-between items-center px-10 py-2 h-14 shadow-md fixed w-full z-10">
        <img
          src="/images/New_TS_Logo_page-0001 1 2.png"
          alt="Logo"
          className="mix-blend-multiply h-10"
        />

        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button className="border-white border-2 rounded-full p-2">
              <User className="text-white w-6 h-6" />
            </button>
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-80">
              <Dialog.Title className="text-lg font-semibold">
                Do you want to log out?
              </Dialog.Title>
              <div className="mt-4 flex justify-end gap-4">
                <Dialog.Close asChild>
                  <button className="px-4 py-2 bg-gray-300 rounded">No</button>
                </Dialog.Close>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded"
                >
                  Yes
                </button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      {/* Sidebar + Main Content */}
      <div className="flex pt-14 h-screen overflow-hidden">
        {/* Sidebar Navigation */}
        <div className="w-64 bg-[#c7c3c3] text-white p-4 h-full overflow-y-auto">
          <h2 className="text-lg font-bold mb-4">Admin Panel</h2>
          <ul className="space-y-2">
            <li>
              <NavLink to="/dashboard" className={({ isActive }) => 
                `block px-4 py-2 rounded ${isActive ? "bg-yellow-300 text-black" : "hover:text-yellow-300"}`
              }>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/category" className={({ isActive }) => 
                `block px-4 py-2 rounded ${isActive ? "bg-yellow-300 text-black" : "hover:text-yellow-300"}`
              }>
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink to="/subcategory" className={({ isActive }) => 
                `block px-4 py-2 rounded ${isActive ? "bg-yellow-300 text-black" : "hover:text-yellow-300"}`
              }>
                Subcategories
              </NavLink>
            </li>
            <li>
              <NavLink
                to="#"
                className="block px-4 py-2 rounded hover:text-yellow-300"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Working on this");
                }}
              >
                Products
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 overflow-hidden">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Navbar;
