import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/Header.css'
function Header() {
  return (
   <header>
    <nav class="headerbody">
    <input type="checkbox" id="check"/>
    <label for="check" class="checkbtn">
      <i class="fa fa-bars"></i>
    </label>
    <label class="logo"><span>e</span>Hospital</label>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/services">Services</Link></li>
      <li><Link to="/specialities">Specialities</Link></li>
      <li><Link to="/AboutUs">About Us</Link></li>
      <li><Link to="/contact">Contact US</Link></li>
      <li><Link to="/LogIn">LogIn</Link></li>
      <li><Link to="/signUp">SignUp</Link></li>
    </ul>
  </nav>
  </header>
  );
}

export default Header;

  {/* message prop requires a string <header>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/DBConnection">DB Connection</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header> */} 