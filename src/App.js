import React from 'react';
import './cssFile.css';
import Navbar from './Navbar.js';

function App() {
  return (
      <div className="App">
          <header className="header">
              {/* Render the UserNavbar component and pass handleSearchChange as a prop */}
              <Navbar />
          </header>
          <main className="mainP">
              <p className="fonts1" style={{ marginRight: '150px' }}>
                  {/* eslint-disable-next-line max-len */}
                  Welcome to MarketMate, the premier online marketplace for buying and selling products. At MarketMate, we are committed to providing you with a seamless, user-friendly platform that makes it easy to find the items you need and connect with sellers who offer the products you want.
                  {' '}
                  <br />
                  <br />
                  {/* eslint-disable-next-line max-len,react/no-unescaped-entities */}
                  Our website offers a wide range of categories, including electronics, fashion, home goods, beauty and health, sports and outdoors, and many more. Whether you're looking for the latest tech gadgets, trendy clothing, or high-quality home decor, you're sure to find it on MarketMate.
                  {' '}
                  <br />
                  <br />
                  {/* eslint-disable-next-line max-len */}
                  As a buyer, you can browse through listings, view detailed product descriptions and images, and compare prices from various sellers.
                  {' '}
                  <br />
                  <br />
                  {/* eslint-disable-next-line max-len */}
                  As a seller, you can easily create listings for your products, set your own prices, and manage your sales and orders through our platform.
                  {' '}
                  <br />
                  <br />
                  {/* eslint-disable-next-line max-len */}
                  We are passionate about building a vibrant community of buyers and sellers who share a common goal of making buying and selling easy, convenient, and enjoyable. Thank you for choosing MarketMate as your trusted partner for all your online shopping and selling needs.
              </p>
          </main>
      </div>
  );
}

export default App;
