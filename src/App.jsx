import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Appointments from './pages/Appointments';
import Customers from './pages/Customers';
import Animals from './pages/Animal';
import Doctors from './pages/Doctors'
import Vaccine from './pages/Vaccine';
import Reports from './pages/Reports';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/Vetapp-FS" element={<Home />} />
        <Route path="/Vetapp-FS/appointments" element={<Appointments />} />
        <Route path="/Vetapp-FS/customers" element={<Customers />} />
        <Route path="/Vetapp-FS/animals" element={<Animals />} />
        <Route path="/Vetapp-FS/doctors" element={<Doctors />} />
        <Route path="/Vetapp-FS/vaccine" element={<Vaccine />} />
        <Route path="/Vetapp-FS/report" element={<Reports />} />
      </Routes>
    </Router>
  );
};

export default App;