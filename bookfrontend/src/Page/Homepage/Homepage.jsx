import React from 'react'
import NormalHeader from '../../Component/Header/NormalHeader'
import './Homepage.css';
import Footer from '../Footer/Footer';

const Homepage = () => {
  return (
    <>
      <NormalHeader />
      <div className="homepage-container">
        <div className="container first-container">
          <h2>Welcome to Bookify 
          </h2>
        </div>
        <div className="container second-container">
          <h2>We have all the Latest Editions available </h2>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Homepage