// import React from 'react';
//
// function ContactDetailsPopup({ user }) {
//   const handleWhatsAppClick = () => {
//     const whatsappUrl = `https://wa.me/${user.whatsapp}`;
//     window.open(whatsappUrl, '_blank');
//   };
//
//   return (
//       <div className="contact-details-popup">
//           <h3>Contact Details</h3>
//           <p>
//               Name:
//               {user.name}
//           </p>
//           <p>
//               Email:
//               {user.email}
//           </p>
//           <p>
//               Phone:
//               {user.phone}
//           </p>
//           <p>
//               WhatsApp:
//               <span className="whatsapp-link" onClick={handleWhatsAppClick}>
//                   {user.whatsapp}
//               </span>
//           </p>
//           {/* Add any other contact details you want to display */}
//       </div>
//   );
// }
//
// export default ContactDetailsPopup;
