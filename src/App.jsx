import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WebSocketProvider } from "./context/WebSocketContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import TeamPage from "./pages/TeamPage";
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';

function App() {
  return (
    <WebSocketProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/teams/:teamName" element={<TeamPage />} />
            </Routes>
          </div>
          <Footer />
          <Toaster 
            position="top-right"
          />
        </div>
      </Router>
    </WebSocketProvider>
  );
}

export default App; 