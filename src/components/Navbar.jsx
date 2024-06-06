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
            <Link to="/add-customer">Customer</Link>
            <Link to="/add-animal">Animal</Link>
            <Link to="/add-doctor">Doctor</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;