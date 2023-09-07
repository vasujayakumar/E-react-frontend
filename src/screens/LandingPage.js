import React from 'react';
import Header from '../components/Header';
import '../styles/screens/LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
        <h1>Welcome to Smart Digital Medicine</h1>
        <p>Your Health, Our Priority</p>
      <footer>
        <p>&copy; {new Date().getFullYear()} Smart Digital Medicine</p>
      </footer>
    </div>
  );
};

export default LandingPage;
