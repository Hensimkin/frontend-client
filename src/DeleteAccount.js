/* eslint-disable */
import React, { useState } from 'react';
import axios from 'axios';

function DeleteAccount({ onClose }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');

  const handleDeleteAccountClick = () => {
    setShowConfirmation(true);
  };

  const handleCancelDelete = () => {
    // Close the DeleteAccount modal
    onClose();
  };

  const handleConfirmDelete = () => {
    setShowConfirmation(false);
    setShowPasswordConfirmation(true);
  };

  const handleConfirmPassword = async () => {
    try {
      if (!deletePassword) {
        return;
      }

      // Show the final confirmation popup
      const confirmed = window.confirm('Press on "Confirm" will delete the user permanently. Are you sure you want to delete?');
      if (confirmed) {
        const response = await axios.post('https://backend-server-qdnc.onrender.com/delete_account', {
          password: deletePassword,
        });

        console.log(response.data); // Account deleted successfully
        if (response.data === 'User account has been deleted successfully') {
          window.location.href = '/';
        }

        // Close the DeleteAccount modal
        onClose();
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      // Handle error deleting account
    }
  };

  const handleCancelPassword = () => {
    // Clear the password input
    setDeletePassword('');

    // Close the DeleteAccount modal
    onClose();
  };

  return (
    <div>
      {!showConfirmation && !showPasswordConfirmation && (
        <div className="delete-popup">
          <p>Are you sure you want to delete your account?</p>
          <button className="confirm-button" onClick={handleConfirmDelete}>
            Yes
          </button>
          <button className="cancel-button" onClick={handleCancelDelete}>
            No
          </button>
        </div>
      )}

      {showPasswordConfirmation && (
        <div className="delete-popup">
          <p>Please enter your password to confirm:</p>
          <input type="password" value={deletePassword} onChange={(e) => setDeletePassword(e.target.value)} />
          <button className="confirm-button" onClick={handleConfirmPassword}>
            Yes
          </button>
          <button className="cancel-button" onClick={handleCancelPassword}>
            No
          </button>
        </div>
      )}
    </div>
  );
}

export default DeleteAccount;
