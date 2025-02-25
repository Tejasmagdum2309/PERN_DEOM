import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateCategory = () => {
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [status, setStatus] = useState(true);
  const [sequence, setSequence] = useState("");

  const handleCreate = () => {
    const token = localStorage.getItem("token"); // Retrieve token
    
    axios.post(
      "http://localhost:3000/categories",
      { categoryName, imgUrl, status, sequence },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(() => navigate("/category"))
    .catch((error) => console.error("Error creating category:", error));
  };

  return (
    <div className="p-4">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-500">← Back</button>
      <h2 className="text-xl font-bold mb-4">Create Category</h2>
      <div className="mb-4">
        <label className="block">Category Name</label>
        <input 
          type="text" 
          value={categoryName} 
          onChange={(e) => setCategoryName(e.target.value)} 
          className="p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block">Image URL</label>
        <input 
          type="text" 
          value={imgUrl} 
          onChange={(e) => setImgUrl(e.target.value)} 
          className="p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block">Status</label>
        <select 
          value={status ? "true" : "false"} // Fixed: Convert boolean to string//+
          onChange={(e) => setStatus(e.target.value === "true")}
          className="p-2 border rounded w-full"
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block">Sequence</label>
        <input 
          type="number" 
          value={sequence} 
          onChange={(e) => setSequence(e.target.value)} 
          className="p-2 border rounded w-full"
        />
      </div>
      <button onClick={handleCreate} className="px-4 py-2 bg-green-500 text-white rounded">Create</button>
    </div>
  );
};

export default CreateCategory;