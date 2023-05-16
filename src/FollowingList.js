import React from 'react';

function FollowingList({ onClose }) {
  const handleClose = () => {
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Followers List</h2>
        {/* Display the list of followers */}
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
}

export default FollowingList;