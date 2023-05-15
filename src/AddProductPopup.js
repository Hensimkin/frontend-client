/* eslint-disable */
import React, { useState } from 'react';
import './AddProductPopup.css';

function AddProductPopup(props) {
  const [category, setCategory] = useState('Select Category');
  const [price, setPrice] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pictures, setPictures] = useState([]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePictureChange = (event) => {
    setPictures(event.target.files);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can add your logic for submitting the form data to your server or saving it in a state
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Add a new product</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Category:
            <select value={category} onChange={handleCategoryChange}>
              <option disabled>Select Category</option>
              <option value="computers">Computers</option>
              <option value="electronics">Electronics</option>
              <option value="furniture">Furniture</option>
              <option value="books">Books</option>
            </select>
          </label>
          <br></br>
          <label>
            Price:
            <input type="text" value={price} onChange={handlePriceChange} />
          </label>
          <br></br>
          <label>
            Title:
            <input type="text" value={title} onChange={handleTitleChange} />
          </label>
          <br></br>
          <label>
            Description:
            <textarea
              value={description}
              onChange={handleDescriptionChange}
            />
          </label>
          <br></br>
          <label>
            Pictures:
            <input
              type="file"
              multiple
              onChange={handlePictureChange}
            />
          </label>
          <br></br>
          <button type="submit" onClick={props.closePopup}>Submit</button>
        </form>
        <button type="button" onClick={props.closePopup}>Close</button>
      </div>
    </div>
  );
}

export default AddProductPopup;

