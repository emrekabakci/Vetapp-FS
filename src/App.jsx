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
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/animals" element={<Animals />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/vaccine" element={<Vaccine />} />
        <Route path="/report" element={<Reports />} />
      </Routes>
    </Router>
  );
};

export default App;