import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");
  const [sequence, setSequence] = useState("");

  const handleUpdate = () => {
    axios.put(`http://localhost:3000/categories/${id}`, { categoryName, sequence })
      .then(() => navigate("/category"))
      .catch((error) => console.error("Error updating category:", error));
  };

  return (
    <div className="p-4">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-500">← Back</button>
      <h2 className="text-xl font-bold mb-4">Update Category</h2>
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
        <label className="block">Sequence</label>
        <input 
          type="number" 
          value={sequence} 
          onChange={(e) => setSequence(e.target.value)} 
          className="p-2 border rounded w-full"
        />
      </div>
      <button onClick={handleUpdate} className="px-4 py-2 bg-blue-500 text-white rounded">Update</button>
    </div>
  );
};

export default UpdateCategory;
