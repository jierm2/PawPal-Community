import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePageDesktop from "./pages/HomePage/Home";
import Login from "./pages/LoginPage/Login";
import Services from "./pages/Services";
import Signup from "./pages/SignupPage/Signup";
import Walker from "./pages/WalkerPage/Walker";
import Mission from "./pages/MissionPage/Mission";
import Navbar from './components/Navbar';
import Footer from "./components/Footer";
import Settings from "./pages/SettingsPage/Settings";
import { Box } from '@mui/material';

function App() {
  return (
    <Router>
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh', // Minimum height of 100% of the viewport height
        }}
        component="div"
      >
        <Box component="main" sx={{ flexGrow: 1 }}>
          
      <Routes>
        <Route path="/" element={<HomePageDesktop />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/walker" element={<Walker />} />
        <Route path="/settings" element={<Settings />} />

      </Routes>
      </Box>
      <Footer/>
      </Box>
    </Router>
  );
}

export default App;
