import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MaterialsList() {
  const [materials, setMaterials] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await fetch('http://localhost:3001/materials');
      const data = await response.json();
      setMaterials(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleView = (id) => {
    navigate(`/view/${id}`);
  };

  return (
    <div className="mt-20 mx-20">
      <h2 className="font-serif font-semibold text-xl">Materials List</h2>
      <table className="table-auto w-full mt-10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Technology</th>
            <th>Color</th>
            <th>Price</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {materials.map(material => (
            <tr key={material._id}>
              <td>{material.name}</td>
              <td>{material.technology}</td>
              <td>{material.color.map(c => c.color).join(', ')}</td>
              <td>{material.price}</td>
              <td>{material.type.map(t => t.type).join(', ')}</td>
              <td>
                <button 
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleView(material._id)}
                >
                  View
                </button>
                <button 
                  className="bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() => handleEdit(material._id)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
