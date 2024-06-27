import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditMaterial = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [material, setMaterial] = useState({
    name: '',
    technology: '',
    color: '',
    price: '',
    type: ''
  });

  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        const response = await fetch(`http://localhost:3001/materials/${id}`);
        const data = await response.json();
        setMaterial({
          name: data.name,
          technology: data.technology,
          color: data.color.join(', '),
          price: data.price,
          type: data.type.join(', ')
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchMaterial();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMaterial((prevMaterial) => ({
      ...prevMaterial,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:3001/materials/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...material,
          color: material.color.split(',').map((c) => c.trim()),
          type: material.type.split(',').map((t) => t.trim())
        })
      });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-20 mx-20">
      <h2 className="font-serif font-semibold text-xl">Edit Material</h2>
      <form onSubmit={handleSubmit} className="mt-10">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={material.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Technology</label>
          <input
            type="text"
            name="technology"
            value={material.technology}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Color</label>
          <input
            type="text"
            name="color"
            value={material.color}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="text"
            name="price"
            value={material.price}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Type</label>
          <input
            type="text"
            name="type"
            value={material.type}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMaterial;
