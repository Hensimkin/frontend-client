/* eslint-disable */
import React, { useState } from 'react';

function FollowersList({ onClose }) {

  const handleSubmit = (event) => {
    event.preventDefault();
    onClose();
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <span className="close-button" onClick={onClose}>
          x
        </span>
        <h1 className="head">Followers</h1>
        <form onSubmit={handleSubmit}>
          <br></br>

          <br></br>
          <button type="submit" >Close</button>
        </form>
        <br></br>
      </div>
    </div>
  );
}

export default FollowersList;
