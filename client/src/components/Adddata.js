import React, { useState } from 'react';
import { Cdata, Adata } from '../data/data';
import Multiselect from 'multiselect-react-dropdown';

export default function Adddata() {
  const [Coptions] = useState(Cdata);
  const [Aoptions] = useState(Adata);
  const [name, setName] = useState('');
  const [technology, setTechnology] = useState('');
  const [color, setColor] = useState([]);
  const [price, setPrice] = useState('');
  const [type, setType] = useState([]);
  const [image, setImage] = useState(null);

  const handleColorSelect = (selectedList) => {
    setColor(selectedList);
  };

  const handleColorRemove = (selectedList) => {
    setColor(selectedList);
  };

  const handleTypeSelect = (selectedList) => {
    setType(selectedList);
  };

  const handleTypeRemove = (selectedList) => {
    setType(selectedList);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const collectdata = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('technology', technology);
    formData.append('price', price);
    formData.append('color', JSON.stringify(color));
    formData.append('type', JSON.stringify(type));
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch('http://localhost:3001/materials', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={collectdata}>
      <p className='mt-20 mx-20 font-serif font-semibold text-xl'>Enter your Details</p>

      <div className='mt-10 mx-20'>
        <label>Name</label>
        <input
          placeholder='Enter your name'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-solid border-2 border-gray-500 rounded mx-4 p-2"
        />
      </div>

      <div className='mt-5 mx-20'>
        <label>Technology</label>
        <input
          placeholder='Enter technology'
          type='text'
          value={technology}
          onChange={(e) => setTechnology(e.target.value)}
          className="border-solid border-2 border-gray-500 rounded mx-4 p-2"
        />
      </div>

      <div className='mt-5 mx-20 flex'>
        <label className='pr-5'>Colors</label>
        <Multiselect
          options={Coptions}
          displayValue="color"
          selectedValues={color}
          onSelect={handleColorSelect}
          onRemove={handleColorRemove}
          className="border-solid border-2 border-gray-500 rounded max-w-30"
        />
      </div>

      <div className='mt-5 mx-20'>
        <label>Price Per Gram</label>
        <input
          placeholder='Enter your price'
          type='text'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border-solid border-2 border-gray-500 rounded mx-4 p-2"
        />
      </div>

      <div className='mt-5 mx-20 flex'>
        <label className='pr-5'>Application Types</label>
        <Multiselect
          options={Aoptions}
          displayValue="type"
          selectedValues={type}
          onSelect={handleTypeSelect}
          onRemove={handleTypeRemove}
          className="border-solid border-2 border-gray-500 rounded max-w-30"
        />
      </div>

      <div className='mt-5 mx-20 flex'>
        <p className='pr-5'>Image Upload</p>
        <input type='file' onChange={handleImageChange} />
      </div>

      <button type="submit" className="mt-5 mx-20 p-2 bg-slate-600 text-white font-semibold rounded-lg shadow-md">
        Submit
      </button>
    </form>
  );
}
