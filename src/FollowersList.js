// import React from 'react';
//
// function FollowersList() {
//   // Implement the logic to fetch and display the list of followers
//   return (
//     <div>
//       <h2>Followers</h2>
//       {/* Display the list of followers */}
//     </div>
//   );
// }
//
// export default FollowersList;

import React from 'react';

function FollowersList({ onClose }) {
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

export default FollowersList;