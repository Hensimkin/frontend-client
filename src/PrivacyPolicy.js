import React from 'react';
import Popup from 'reactjs-popup';
import './PrivacyPolicy.css'; // Import the CSS file

function PrivacyPopup() {
  return (
    <div>
      <input type="checkbox" required="true" />
      <label className="fonts2">
        I agree with the
        <Popup
          trigger={<button type="button" className="privacy-policies-button">privacy policies</button>}
          position="right center"
          modal
          closeOnDocumentClick
        >
          <div className="popup-content">
            <h2>Privacy Policies</h2>
            <p>Privacy Policy

              Introduction
              1.We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your personal data when you interact with our website and services.

              Information We Collect
              2.We may collect various types of personal information from you, including but not limited to:

              Name, email address, and contact details
              Demographic information
              Usage data and analytics
              Use of Information
              We use the collected information for the following purposes:


             </p>

          </div>
        </Popup>
      </label>
    </div>
  );
}

export default PrivacyPopup;
