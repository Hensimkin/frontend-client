import React from 'react';
import './cssFile.css';
import { FloatingWhatsApp } from 'react-floating-whatsapp';

function ContactDetailsPopup({ listing, closePopup }) {
  const phoneNumber = listing.phone;
  const { name } = listing;
  const formattedPhoneNumber = phoneNumber.replace(/\D/g, ''); // Remove non-digit characters

  // Function to handle the phone number click and initiate a phone call
  const handlePhoneNumberClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  // Function to handle the WhatsApp click and open a WhatsApp chat
  // eslint-disable-next-line no-unused-vars
  const handleWhatsAppClick = () => {
    window.location.href = `https://wa.me/${formattedPhoneNumber}`;
  };

  return (
      <div className="popup">
          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,react/destructuring-assignment,jsx-a11y/no-static-element-interactions,react/prop-types */}
          <div onClick={closePopup} className="overlay" />
          <div className="popup-inner">
              {/* eslint-disable-next-line max-len */}
              {/* eslint-disable-next-line react/prop-types,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,react/destructuring-assignment */}
              <span className="close-button" onClick={closePopup}>
                  x
              </span>
              <div className="fonts">
                  <h2>Contact Details</h2>
                  <p>
                      Phone Number:
                      {/* eslint-disable-next-line max-len */}
                      <a href={`tel:${phoneNumber}`} onClick={handlePhoneNumberClick}>{phoneNumber}</a>
                  </p>
                  {/* <p> */}
                  {/*   WhatsApp: */}
                  {/* eslint-disable-next-line max-len */}
                  {/*   <a href={`https://wa.me/${formattedPhoneNumber}`} onClick={handleWhatsAppClick}>Send Message</a> */}
                  {/* </p> */}
                  <FloatingWhatsApp accountName={name} phoneNumber={phoneNumber} />
                  <button type="button" onClick={closePopup}>
                      Close
                  </button>
              </div>

          </div>
      </div>
  );
}

export default ContactDetailsPopup;
