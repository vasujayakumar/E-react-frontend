import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './screens/LandingPage';
import DBConnection from './screens/DBConnection';
import Contact from './screens/Contact';
import Searchpatient from './screens/searchpatient';
import Searchresult from './screens/searchresult';
import Header from './components/Header-new';
import Footer from './components/footer-new';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/searchpatient" element={<Searchpatient />} />
        <Route path="/Searchresult" element={<Searchresult />} />
        <Route path="/DBConnection" element={<DBConnection />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;


