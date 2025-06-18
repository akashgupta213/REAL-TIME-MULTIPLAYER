import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <h1>
        <Link to="/" className="logo">🎮 GameHub</Link>
      </h1>

     
    </nav>
  );
}

export default Navbar;
