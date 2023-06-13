import React, { useState } from 'react';
import './cssFile.css';
import axios from 'axios';

function AddProductPopup(props) {
  const [category, setCategory] = useState('Select Category');
  const [price, setPrice] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pictures, setPictures] = useState([]);
  const [, setTitleResponse] = useState('');
  const [priceError, setPriceError] = useState('');
  const [titleError, setTitleError] = useState('');

  async function post(e) {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append('title', title);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('description', description);
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < pictures.length; i++) {
        formData.append('pictures', pictures[i]);
      }
      // eslint-disable-next-line max-len
      const response_pictures = await axios.post('https://backend-server-qdnc.onrender.com/post_all', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // eslint-disable-next-line max-len
      setTitleResponse(response_pictures.data); // Set the response from the server to the state variable
      console.log(response_pictures); // Log the response received from the server

      // eslint-disable-next-line react/destructuring-assignment,react/prop-types
      const message = 'The listing has been uploaded';
      alert(message); // Display the server response in an alert window
      // eslint-disable-next-line react/destructuring-assignment
      props.closePopup();
    } catch (error) {
      console.log(error);
    }
  }

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handlePriceChange = (event) => {
    const newPrice = event.target.value;
    setPrice(newPrice);
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(newPrice)) {
      setPriceError('Price must be a number');
    } else {
      setPriceError('');
    }
  };

  const handleTitleChange = (event) => {
    const { value } = event.target;
    setTitle(value);
    if (/[^\w\s]/.test(value)) {
      setTitleError('Title can only contain letters, numbers, and spaces');
    } else if (value.trim() === '') {
      setTitleError('Please enter a title');
    } else {
      setTitleError('');
    }
  };

  const handleDescriptionChange = (event) => {
    const inputDescription = event.target.value;
    if (inputDescription.length <= 60) {
      setDescription(inputDescription);
    }
  };

  const handlePictureChange = (event) => {
    setPictures(event.target.files);
  };

  return (
      <div className="popup">
          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,react/destructuring-assignment,jsx-a11y/no-static-element-interactions,react/prop-types */}
          <div onClick={props.closePopup} className="overlay" />
          <div className="popup-inner">
              {/* eslint-disable-next-line max-len */}
              {/* eslint-disable-next-line react/prop-types,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,react/destructuring-assignment */}
              <span className="close-button" onClick={props.closePopup}>
                  x
              </span>
              <h2>Add a new product</h2>
              <form onSubmit={post}>
                  <label>
                      Category:
                      <select
                        value={category}
                        onChange={handleCategoryChange}
                        required={category !== 'Select Category'}
                      >
                          <option value="Select Category">Select Category</option>
                          <option value="computers">Computers</option>
                          <option value="electronics">Electronics</option>
                          <option value="furniture">Furniture</option>
                          <option value="books">Books</option>
                      </select>
                      {category === 'Select Category'
              && <span className="error" style={{ color: 'red' }}>Please select a category</span>}
                  </label>
                  <br />
                  <label>
                      Price:
                      {/* eslint-disable-next-line max-len */}
                      <input type="text" pattern="[0-9]*" value={price} onChange={handlePriceChange} />
                      {/* eslint-disable-next-line max-len */}
                      {priceError && <span className="error" style={{ color: 'red' }}>{priceError}</span>}
                  </label>
                  <br />
                  <label>
                      Title:
                      {/* eslint-disable-next-line max-len */}
                      <input type="text" pattern="[0-9a-zA-Z ]*" value={title} onChange={handleTitleChange} />
                      {/* eslint-disable-next-line max-len */}
                      {titleError && <span className="error" style={{ color: 'red' }}>{titleError}</span>}
                  </label>
                  <br />
                  <label>
                      Description:
                      <textarea
                        value={description}
                        onChange={handleDescriptionChange}
                      />
                  </label>
                  <br />
                  <label>
                      Pictures:
                      <input
                        type="file"
                        multiple
                        onChange={handlePictureChange}
                      />
                  </label>
                  <br />
                  <button
                    type="submit"
                    // eslint-disable-next-line max-len
                    disabled={category === 'Select Category' || title.trim() === '' || price.trim() === ''}
                  >
                      Submit
                  </button>
              </form>
              {/* eslint-disable-next-line react/destructuring-assignment,react/prop-types */}
              <button type="button" onClick={props.closePopup}>Close</button>
          </div>
      </div>
  );
}

export default AddProductPopup;
