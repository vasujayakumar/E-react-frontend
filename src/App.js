import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './screens/LandingPage';
import DBConnection from './screens/DBConnection';
import Contact from './screens/Contact';
import AboutUs from './screens/AboutUs';
import Searchpatient from './screens/searchpatient';
import Searchresult from './screens/searchresult';
import Skincancerml from './screens/skincancerml';
import Header from './components/Header-new';
import Footer from './components/footer-new';
import Kidney_stone_ml from './screens/eir_kidney_stone_checker';
import Ckdml from './screens/eir_kidney_cdk_checker';
import Pneumoniaml from './screens/Pneumoniaml';
import adeeb from './screens/adeeb';
import test from './screens/test';




function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/searchpatient" element={<Searchpatient />} />
        <Route path="/skincancerml" element={<Skincancerml />} />
        <Route path="/Searchresult" element={<Searchresult />} />
        <Route path="/DBConnection" element={<DBConnection />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/kidneystoneml" element={<Kidney_stone_ml/>} />
        <Route path="/chronickidneyml" element={ <Ckdml />}/>
        <Route path="/Pneumoniaml" element={ <Pneumoniaml />}/>
        <Route path="/adeeb" element={ <adeeb />}/>
        <Route path="/test" element={<test />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;


