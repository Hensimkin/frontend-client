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
        <form onSubmit={post}>
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
          <button type="submit" >Submit</button>
        </form>
        <button type="button" onClick={props.closePopup}>Close</button>
      </div>
    </div>
  );
}

export default AddProductPopup;

