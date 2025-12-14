import React, { useState } from 'react';
import './Header.css'
import { useNavigate } from "react-router-dom";


const Header = () => {
  const navigate = useNavigate();



  return (
    <header className="header">
      <div className="menu-icon" onClick={() => navigate("/category")}>
        <i className="fas fa-bars"></i>
      </div>
      
    </header>
  );
};

export default Header;