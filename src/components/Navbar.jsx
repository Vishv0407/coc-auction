import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { teamData } from '../constants/teamData';
import {
  FaHome,
  FaChartLine,
  FaUsers,
  FaChevronDown,
  FaChevronUp,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const [isTeamsOpen, setIsTeamsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const NavLinks = () => (
    <nav className="space-y-2">
      {/* Home Link */}
      <Link
        to="/"
        onClick={() => setIsMobileMenuOpen(false)}
        className={`flex items-center space-x-3 px-4 py-3 rounded-lg
          transition-colors ${isActive('/') 
            ? 'bg-blue-500 text-white' 
            : 'text-gray-600 hover:bg-gray-100'}`}
      >
        <FaHome />
        <span>Home</span>
      </Link>

      {/* Dashboard Link */}
      <Link
        to="/dashboard"
        onClick={() => setIsMobileMenuOpen(false)}
        className={`flex items-center space-x-3 px-4 py-3 rounded-lg
          transition-colors ${isActive('/dashboard') 
            ? 'bg-blue-500 text-white' 
            : 'text-gray-600 hover:bg-gray-100'}`}
      >
        <FaChartLine />
        <span>Live Dashboard</span>
      </Link>

      {/* Teams Section */}
      <div>
        <button
          onClick={() => setIsTeamsOpen(!isTeamsOpen)}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg
            transition-colors text-gray-600 hover:bg-gray-100`}
        >
          <div className="flex items-center space-x-3">
            <FaUsers />
            <span>Teams</span>
          </div>
          {isTeamsOpen ? <FaChevronUp /> : <FaChevronDown />}
        </button>

        {/* Team Submenu */}
        <div className={`ml-4 space-y-1 mt-1 ${isTeamsOpen ? 'block' : 'hidden'}`}>
          {Object.entries(teamData).map(([teamName, data]) => (
            <Link
              key={teamName}
              to={`/teams/${teamName.toLowerCase()}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg
                transition-colors ${isActive(`/teams/${teamName.toLowerCase()}`)
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <img src={data.icon} alt={teamName} className="w-5 h-5" />
              <span>{teamName}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );

  return (
    <>
      {/* Desktop Navbar */}
      <div className="hidden lg:block fixed top-0 left-0 h-full w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-8">
            Clash of Codes
          </h1>
          <NavLinks />
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white shadow-lg z-50">
        <div className="flex items-center justify-between px-4 h-full">
          <Link to="/" className="text-xl font-bold text-gray-800">
            Clash of Codes
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FaBars className="text-2xl text-gray-600" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 z-50"
            />

            {/* Slide-out Menu */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="lg:hidden fixed top-0 right-0 bottom-0 w-80 bg-white shadow-lg z-50
                        overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-2xl font-bold text-gray-800">Menu</h1>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FaTimes className="text-2xl text-gray-600" />
                  </button>
                </div>
                <NavLinks />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;