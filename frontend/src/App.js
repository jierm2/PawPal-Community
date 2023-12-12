import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePageDesktop from "./pages/HomePage/Home";
import Login from "./pages/LoginPage/Login";
import Services from "./pages/ServicesPage/Services";
import Signup from "./pages/SignupPage/Signup";
import Walker from "./pages/WalkerPage/Walker";
import Mission from "./pages/MissionPage/Mission";
import Navbar from './components/Navbar';
import Footer from "./components/Footer";
import Settings from "./pages/SettingsPage/Settings";
import { Box } from '@mui/material';
import { AuthProvider } from "./auth";
import Find from "./pages/FindPage/Find";
import ProtectedRoute from "./util/ProtectRoute";
import PublicRoute from "./util/PublicRoute";

function App() {
  return (
    <AuthProvider>
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
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/sign-up" element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path="/walker" element={<ProtectedRoute><Walker /></ProtectedRoute>} />
        <Route path="/search" element={<ProtectedRoute><Find /></ProtectedRoute>} />

        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

      </Routes>
      </Box>
      <Footer/>
      </Box>
    </Router>
    </AuthProvider>
  );
}

export default App;
