import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './screens/Home';
import Contact from './screens/Contact';
import About from './screens/About';
import Navheader from './components/Navigation';


function App() {
  return (
    <BrowserRouter>
      <Navheader/>
      <Routes>
          <Route index element={<Home />} />
          <Route path="About" element={<About />} />
          <Route path="contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;