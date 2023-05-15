import React from 'react';
import './index.css';
// import {Route, Routes} from "react-router-dom";
// import  {Link} from "react-router-dom";
// eslint-disable-next-line import/extensions
import Navbar from './Navbar.js'; // import the Navbar component
import AddProductPopup from './AddProductPopup.js';

function App() {
  const [popupIsOpen, setPopupIsOpen] = useState(false);

  const openPopup = () => {
    setPopupIsOpen(true);
  };

  const closePopup = () => {
    setPopupIsOpen(false);
  };

  return (
      <div className="App">

          <header className="header">
              <Navbar />
          </header>
          <main className="main">
              <h1 className="fonts1" style={{marginLeft:'350px'}}>MarketMate</h1>
            <p className="fonts1"style={{marginRight:'150px'}} >
              Welcome to MarketMate, the premier online marketplace for buying and selling products. At MarketMate, we are committed to providing you with a seamless, user-friendly platform that makes it easy to find the items you need and connect with sellers who offer the products you want. <br/><br/>
              Our website offers a wide range of categories, including electronics, fashion, home goods, beauty and health, sports and outdoors, and many more. Whether you're looking for the latest tech gadgets, trendy clothing, or high-quality home decor, you're sure to find it on MarketMate. <br/><br/>
              As a buyer, you can browse through listings, view detailed product descriptions and images, and compare prices from various sellers. <br/><br/>
              As a seller, you can easily create listings for your products, set your own prices, and manage your sales and orders through our platform. <br/><br/>
              We are passionate about building a vibrant community of buyers and sellers who share a common goal of making buying and selling easy, convenient, and enjoyable. Thank you for choosing MarketMate as your trusted partner for all your online shopping and selling needs.
            </p>

          </main>

      </div>
    <div className="App">
      <header className="header">
        <Navbar />
      </header>
      <main className="main">
        {!popupIsOpen && (
          <button type="button" onClick={openPopup}>
            Add Product
          </button>
        )}
        {popupIsOpen && <AddProductPopup closePopup={closePopup} />}
        {!popupIsOpen && (
          <>
            <h1 className="title1">Social media</h1>
            <p className="description" style={{ color: 'white' }}>
              Join the NetConnect community today and start sharing your world
              with others!
            </p>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
