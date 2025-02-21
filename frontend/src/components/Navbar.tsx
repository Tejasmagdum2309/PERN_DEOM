import React, { useState } from "react";
import { User } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("User logged out!");
    localStorage.clear();
    navigate("/");

    setOpen(false);
    // Perform logout logic (e.g., remove token, redirect to login)
  };

  return (
    <div className="bg-[#662671] flex justify-between items-center px-10 py-4">
      <img
        src="/images/New_TS_Logo_page-0001 1 2.png"
        alt="Logo"
        className="mix-blend-multiply"
      />

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <button className="border-white border-2 rounded-full p-2">
            <User className="text-white w-8 h-8" />
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
  );
};

export default Navbar;
