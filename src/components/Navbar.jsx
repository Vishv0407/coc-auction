import React, { useState,useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { teamData } from '../constants/teamData';
import { FaSun, FaMoon } from 'react-icons/fa';
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
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

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

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
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
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
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
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
      >
        <FaChartLine />
        <span>Live Dashboard</span>
      </Link>

      {/* Teams Section */}
      <div>
        <button
          onClick={() => setIsTeamsOpen(!isTeamsOpen)}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg
            transition-colors text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700`}
        >
          <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 ">
            <FaUsers />
            <span>Teams</span>
          </div>
          {isTeamsOpen ? <FaChevronUp className='text-gray-600 dark:text-gray-400'/> : <FaChevronDown className='text-gray-600 dark:text-gray-400' />}
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
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
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
      <div className="hidden lg:block fixed top-0 left-0 h-full w-64 bg-white dark:bg-[#010815] shadow-lg dark:border-r-[1px] dark:border-r-gray-900">
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Clash of Codes
            </h1>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700
                      transition-colors text-gray-600 dark:text-gray-300"
            >
              {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
            </button>
          </div>
          <NavLinks />
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-[#010815] dark:border-b-[1px] dark:border-b-gray-900 shadow-lg z-50">
        <div className="flex items-center justify-between px-4 h-full">
          <Link to="/" className="text-xl font-bold text-gray-800 dark:text-gray-300">
            Clash of Codes
          </Link>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              {theme === 'light' ? <FaMoon className="text-gray-600" /> : <FaSun className="text-gray-300" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <FaBars className="text-2xl text-gray-600 dark:text-gray-300" />
            </button>
          </div>
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
              className="lg:hidden fixed top-0 right-0 bottom-0 w-80 bg-white dark:bg-[#010815] shadow-lg z-50
                        overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-300">Menu</h1>
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