import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateSubcategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subcategoryName, setSubcategoryName] = useState("");
  const [sequence, setSequence] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3000/subcategories/${id}`)
      .then((response) => {
        setSubcategoryName(response.data.subcategoryName);
        setSequence(response.data.sequence);
      })
      .catch((error) => console.error("Error fetching subcategory:", error));
  }, [id]);

  const handleUpdate = () => {
    axios.put(`http://localhost:3000/subcategories/${id}`, { subcategoryName, sequence })
      .then(() => navigate("/Subcategory"))
      .catch((error) => console.error("Error updating subcategory:", error));
  };

  return (
    <div className="p-4">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-500">← Back</button>
      <h2 className="text-xl font-bold mb-4">Update Subcategory</h2>
      <div className="mb-4">
        <label className="block">Subcategory Name</label>
        <input 
          type="text" 
          value={subcategoryName} 
          onChange={(e) => setSubcategoryName(e.target.value)} 
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

export default UpdateSubcategory;
