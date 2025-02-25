import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface Category {
  id: string;
  categoryName: string;
  imgUrl: string;
  status: boolean;
  sequence: number;
}

const CategoriesTable = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);


  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:3000/categories?page=${currentPage}&limit=5`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCategories(response.data.categories);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      })
      .catch((error) => {

        console.log(error.response.data.message);
        console.error("Error fetching categories:", error.message);
        setLoading(false);
        if(error.response.data.message === "Invalid Token"){
          localStorage.clear();
          window.location.href = "/login";
        }
        
      });
  }, [currentPage]);

  const handleEdit = (id: string) => {
    navigate(`/update-category/${id}`);
  };

  const handleDelete = (id: string) => {
    console.log("Delete category:", id);
  };
  const columns: ColumnDef<Category>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "categoryName", header: "Category Name" },
    { accessorKey: "imgUrl", header: "Image URL" },
    { accessorKey: "status", header: "Status", cell: (info) => (info.getValue() ? "Active" : "Inactive") },
    { accessorKey: "sequence", header: "Sequence" },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <FaEdit className="text-blue-500 cursor-pointer" onClick={() => handleEdit(row.original.id)} />
          <FaTrash className="text-red-500 cursor-pointer" onClick={() => setDeleteId(row.original.id)} />
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: categories,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleDeleteConfirm = () => {
    if (!deleteId) return;
    axios
      .delete(`http://localhost:3000/categories/${deleteId}`)
      .then(() => {
        setCategories(categories.filter((category) => category.id !== deleteId));
        setDeleteId(null);
      })
      .catch((error) => console.error("Error deleting category:", error));
  };


  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <div className="flex justify-between mb-2 "><h2 className="text-xl font-bold mb-4">Categories</h2>  <button className="text-white cursor-pointer bg-[#662671] rounded-md px-4" onClick={() => navigate("/add-category")}>Add Categoty</button></div>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-[#FFF8B7]">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-2 text-left border-b border-gray-400 text-sm">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-100 border-b border-gray-300 ">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-3 text-sm">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 ">
          <div className="bg-gray-300 p-6 rounded shadow-md">
            <p>Do you want to delete this record?</p>
            <div className="flex justify-end gap-4 mt-4">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button onClick={handleDeleteConfirm} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default CategoriesTable;
