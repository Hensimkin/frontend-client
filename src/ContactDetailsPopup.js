/* eslint-disable */
import React from 'react';
import './ContactDetailsPopup.css';
import { FloatingWhatsApp } from 'react-floating-whatsapp';

function ContactDetailsPopup({ listing, closePopup }) {
  const phoneNumber = listing.phone;
  const name = listing.name;
  const formattedPhoneNumber = phoneNumber.replace(/\D/g, ''); // Remove non-digit characters

  // Function to handle the phone number click and initiate a phone call
  const handlePhoneNumberClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  // Function to handle the WhatsApp click and open a WhatsApp chat
  const handleWhatsAppClick = () => {
    window.location.href = `https://wa.me/${formattedPhoneNumber}`;
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <div className= "fonts">
          <h2>Contact Details</h2>
          <p>
            Phone Number:
            <a href={`tel:${phoneNumber}`} onClick={handlePhoneNumberClick}>{phoneNumber}</a>
          </p>
          {/* <p> */}
          {/*   WhatsApp: */}
          {/*   <a href={`https://wa.me/${formattedPhoneNumber}`} onClick={handleWhatsAppClick}>Send Message</a> */}
          {/* </p> */}
          <FloatingWhatsApp   accountName={name} phoneNumber={phoneNumber}/>
          <button type="button" onClick={closePopup}>
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

export default ContactDetailsPopup;





