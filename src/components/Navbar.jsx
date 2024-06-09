import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav>
      <div className="left">
        <Link to=""><img src="/logo.png" alt="Logo" className="logo" /></Link>
        <Link to="/appointments">Appointment</Link>
        <Link to="/report">Report</Link>
        <Link to="/vaccine">Vaccine</Link>
      </div>
      <div className="right">
        <button onClick={() => setShowDropdown(!showDropdown)}>+</button>
        {showDropdown && (
          <div className="dropdown">
            <Link to="/customers" >Customer</Link><br />
            <Link to="/animals">Animal</Link><br />
            <Link to="/doctors">Doctor</Link><br />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;