import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ViewMaterial = () => {
  const { id } = useParams();
  const [material, setMaterial] = useState(null);

  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        const response = await fetch(`http://localhost:3001/materials/${id}`);
        const data = await response.json();
        setMaterial(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMaterial();
  }, [id]);

  if (!material) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-20 mx-20">
      <h2 className="font-serif font-semibold text-xl">View Material</h2>
      <div className="mt-10">
        <p><strong>Name:</strong> {material.name}</p>
        <p><strong>Technology:</strong> {material.technology}</p>
        <p><strong>Color:</strong> {material.color.map(c => c.color).join(', ')}</p>
        <p><strong>Price:</strong> {material.price}</p>
        <p><strong>Type:</strong> {material.type.map(t => t.type).join(', ')}</p>
        {material.image && (
          <div>
            <strong>Image:</strong>
            <img src={`http://localhost:3001/public/images/${material.image}`} alt={material.name} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewMaterial;
