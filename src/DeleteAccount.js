/* eslint-disable */
import React, { useState } from 'react';
import axios from 'axios';

function DeleteAccount({ onClose }) {
  const [deletePassword, setDeletePassword] = useState('');

  const handleConfirmPassword = async () => {
    try {
      if (!deletePassword) {
        return;
      }

      const response = await axios.post('http://localhost:5000/delete_account', {
        password: deletePassword
      });

      console.log(response.data); // Account deleted successfully
      if (response.data === 'User account has been deleted successfully') {
        window.location.href = '/';
      }

      setDeletePassword('');
    } catch (error) {
      console.error('Error deleting account:', error);
      // Handle error deleting account
    }
  };

  const handleCancelPassword = () => {
    setDeletePassword('');
    onClose();
  };

  return (
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
  );
}

export default DeleteAccount;
