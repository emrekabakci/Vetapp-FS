import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav>
      <div className="left">
        <Link to="/Vetapp-FS"><img src="/logo.png" alt="Logo" className="logo" /></Link>
        <Link to="/Vetapp-FS/appointments">Appointment</Link>
        <Link to="/Vetapp-FS/report">Report</Link>
        <Link to="/Vetapp-FS/vaccine">Vaccine</Link>
      </div>
      <div className="right">
        <button onClick={() => setShowDropdown(!showDropdown)}>+</button>
        {showDropdown && (
          <div className="dropdown">
            <Link to="/Vetapp-FS/customers" >Customer</Link><br />
            <Link to="/Vetapp-FS/animals">Animal</Link><br />
            <Link to="/Vetapp-FS/doctors">Doctor</Link><br />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;