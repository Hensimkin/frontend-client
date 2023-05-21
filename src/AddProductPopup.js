/* eslint-disable */
import React, { useState } from 'react';
import './AddProductPopup.css';
import axios from 'axios'
import { Link } from 'react-router-dom'

function AddProductPopup(props) {
  const [category, setCategory] = useState('Select Category');
  const [price, setPrice] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pictures, setPictures] = useState([]);
  const [titleResponse, setTitleResponse] = useState('');
  const [priceError, setPriceError] = useState('');
  const [formError, setFormError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [titleError, setTitleError] = useState("");

  async function post(e) {
    e.preventDefault();
    try {
      const data = {
        title: title,
        price: price,
        category: category,
        description: description,
        pictures: pictures
      };

      const response = await axios.post('http://localhost:5000/post_all', data);
      setTitleResponse(response.data);
      console.log(response);

      const formData = new FormData();
      for (let i = 0; i < pictures.length; i++) {
        formData.append('pictures', pictures[i]);
      }
      const response_pictures = await axios.post('http://localhost:5000/post_pictures', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setTitleResponse(response_pictures.data); // Set the response from the server to the state variable
      console.log(response_pictures); // Log the response received from the server


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
    if (isNaN(newPrice)) {
      setPriceError('Price must be a number');
    } else {
      setPriceError('');
    }
  };

  const handleTitleChange = (event) => {
    const value = event.target.value;
    setTitle(value);
    if (/[^\w\s]/.test(value)) {
      setTitleError("Title can only contain letters, numbers, and spaces");
    } else if (value.trim() === "") {
      setTitleError("Please enter a title");
    } else {
      setTitleError("");
    }
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePictureChange = (event) => {
    setPictures(event.target.files);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const category = event.target.category.value;
    if (!category) {
      alert("Please choose a category.");
      return; // Stop form submission
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Add a new product</h2>
        <form onSubmit={post}>
          <label>
            Category:
            <select value={category} onChange={handleCategoryChange} required={category !== "Select Category"}>
              <option value="Select Category">Select Category</option>
              <option value="computers">Computers</option>
              <option value="electronics">Electronics</option>
              <option value="furniture">Furniture</option>
              <option value="books">Books</option>
            </select>
            {category === "Select Category" && <span className="error" style={{ color: 'red' }}>Please select a category</span>}
          </label>
          <br></br>
          <label>
            Price:
            <input type="text" pattern="[0-9]*" value={price} onChange={handlePriceChange} />
            {priceError && <span className="error" style={{ color: 'red' }}>{priceError}</span>}
          </label>
          <br></br>
          <label>
            Title:
            <input type="text" pattern="[0-9a-zA-Z]*" value={title} onChange={handleTitleChange} />
            {titleError && <span className="error" style={{ color: 'red' }}>{titleError}</span>}
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
          <button type="submit" disabled={category === "Select Category"|| title.trim() === "" || price.trim() === ""}>Submit</button>
        </form>
        <button type="button" onClick={props.closePopup}>Close</button>
      </div>
    </div>
  );
}

export default AddProductPopup;

