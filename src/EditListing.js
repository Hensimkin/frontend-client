/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './cssFile.css';

const categoryOptions = [
  { value: 'Select Category', label: 'Select Category' },
  { value: 'computers', label: 'Computers' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'furniture', label: 'Furniture' },
  { value: 'books', label: 'Books' },
];

function EditListing({ listingId, onClose }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Select Category');
  const [description, setDescription] = useState('');
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/listing/${listingId}`);
        const { title, price, category, description, pictures } = response.data;
        setTitle(title);
        setPrice(price);
        setCategory(category);
        setDescription(description);
        setPictures(pictures);
      } catch (error) {
        console.error('Error fetching listing:', error);
        // Handle error fetching listing
      }
    };

    fetchListing();
  }, [listingId]);

  const handlePictureRemove = (index) => {
    const updatedPictures = [...pictures];
    updatedPictures.splice(index, 1);
    setPictures(updatedPictures);
  };

  const handlePictureAdd = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const base64Image = event.target.result;
      setPictures((prevPictures) => [...prevPictures, base64Image]);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (category === 'Select Category') {
      // Handle the case where the category is not selected
      alert('Please select a category');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/edit_listing/${listingId}`, {
        title,
        price,
        category,
        description,
        pictures,
      });
      console.log(response.data); // Success message

      // Display confirmation message
      const confirmMessage = 'Changes saved. Press OK to refresh the page.';
      if (window.confirm(confirmMessage)) {
        // Refresh the page
        window.location.reload();
      }
    } catch (error) {
      console.error('Error editing listing:', error);
      // Handle error editing listing
    }
  };



  const handleCancel = () => {
    // Close the EditListing modal
    onClose();
  };

  return (
    <div className="popup">
      <div className="overlay" onClick={handleCancel}></div>
      <div className="popup-inner">
        <span className="close-button" onClick={handleCancel}>
          x
        </span>
        <h2>Edit Listing</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Category:
            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <br />
          Price:
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
          <br />
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <br />
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)}  />
          <br />
          Pictures:
          {pictures.map((picture, index) => (
            <div key={index}>
              <img src={picture} alt={`Picture ${index + 1}`} />
              <button type="button" onClick={() => handlePictureRemove(index)}>
                Remove
              </button>
            </div>
          ))}
          <input type="file" accept="image/*" onChange={handlePictureAdd}  />
          <br />
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

export default EditListing;
