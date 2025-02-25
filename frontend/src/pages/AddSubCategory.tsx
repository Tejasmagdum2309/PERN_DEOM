import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Category {
  id: string;
  categoryName: string;
  imgUrl: string;
  status: boolean;
  sequence: number;

}

const CreateSubcategory: React.FC = () => {
  const navigate = useNavigate();
  const [subcategoryName, setSubcategoryName] = useState<string>("");
  const [imgUrl, setImgUrl] = useState<string>("");
  const [status, setStatus] = useState<boolean>(true);
  const [sequence, setSequence] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:3000/categories", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => { setCategories(response.data.categories); console.log(response.data.categories); })
    .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleCreate = () => {
    const token = localStorage.getItem("token");
    
    axios.post(
      "http://localhost:3000/subcategories",
      { subcategoryName, imgUrl, status, sequence: Number(sequence), categoryId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(() => navigate("/subcategory"))
    .catch((error) => { console.error("Error creating subcategory:", error);  });
  };

  return (
    <div className="p-4">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-500">← Back</button>
      <h2 className="text-xl font-bold mb-4">Create Subcategory</h2>
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
          value={status.toString()} 
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
      <div className="mb-4">
        <label className="block">Category</label>
        <select 
          value={categoryId} 
          onChange={(e) => setCategoryId(e.target.value)}
          className="p-2 border rounded w-full"
        >
          <option value="">Select Category</option>
          {Array.isArray(categories) && categories.map((category) => (
  <option key={category.id} value={category.id}>{category.categoryName}</option>
))}

        </select>
      </div>
      <button onClick={handleCreate} className="px-4 py-2 bg-green-500 text-white rounded">Create</button>
    </div>
  );
};

export default CreateSubcategory;
