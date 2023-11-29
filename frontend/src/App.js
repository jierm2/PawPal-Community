import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePageDesktop from './pages/Home';
import Login from './pages/Login';
import Services from './pages/Services';
import Signup from './pages/Signup';
import Walker from './pages/Walker';
import Mission from './pages/Mission'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePageDesktop />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/services" element={<Services />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/walker" element={<Walker />} />
      </Routes>
    </Router>
  );
}

export default App;
