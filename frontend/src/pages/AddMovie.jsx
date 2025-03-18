import React, { useRef, useState } from 'react';
import { ErrorToast, SuccessToast } from '../components/Toaster';
import axios from 'axios';

const AddMovie = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    releaseDate: '',
    price: '',
    image: null, 
  })
  const fileInputRef = useRef(null); 

  const inputHandler = (e)=>{
    const {name, value, type, files} = e.target
    if (type === 'file') {
      setForm({ ...form, [name]: files[0] }); // Save file object
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  const submitHandler = async(e)=>{
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('releaseDate', form.releaseDate);
    formData.append('price', form.price);
    formData.append('image', form.image);
    try {
      const Base_url = import.meta.env.VITE_BASE_URL;
      const URL = Base_url+'/show/movie'
      const response = await axios.post(URL,formData,{
        headers:{
          'Content-Type':'multipart/form-data'
        }
      })
      setForm({
        title: '',
        description: '',
        releaseDate: '',
        price: '',
        image: null, 
      })
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      SuccessToast('Movie Added Successfully')
    } catch (error) {
      ErrorToast('Error in creating Movie '+error)
    }
  }
  return (
    <form className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md my-auto" onSubmit={submitHandler} encType='multipart/enc'>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Add a New Movie</h2>

      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Movie Title</label>
        <input 
          type="text" 
          id="title"
          value={form.title}
          name="title" 
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900" 
          placeholder="Enter movie title" 
          required 
          onChange={inputHandler}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea 
          id="description" 
          name="description" 
          value={form.description}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900" 
          placeholder="Enter movie description" 
          rows="3"
          required
          onChange={inputHandler}
        ></textarea>
      </div>

      <div className="mb-4">
        <label htmlFor="releaseDate" className="block text-sm font-medium text-gray-700">Release Date</label>
        <input 
          type="date" 
          id="releaseDate" 
          name="releaseDate"
          value={form.releaseDate} 
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900" 
          required 
          onChange={inputHandler}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (in INR)</label>
        <input 
          type="number" 
          id="price" 
          name="price" 
          value={form.price}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900" 
          placeholder="Enter ticket price" 
          min="0"
          required 
          onChange={inputHandler}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
        <input 
          type="file" 
          id="image" 
          name="image" 
          ref={fileInputRef}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900" 
          placeholder="Enter ticket price" 
          min="0"
          required 
          onChange={inputHandler}
        />
      </div>

      <button 
        type="submit" 
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Submit
      </button>
    </form>
  );
}

export default AddMovie;
