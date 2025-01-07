import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSun, FaMoon, FaChartLine, FaHistory, FaBars, FaTimes, FaDice } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import toast from "react-hot-toast";

const AdminNavbar = () => {
  const location = useLocation();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const menuVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleClearStorage = () => {
    toast((t) => (
      <div className="flex flex-col gap-4">
        <p className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          Are you sure you want to clear all random bids data?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => {
              try {
                localStorage.removeItem('randomBidsPlayer');
                toast.success('Random bids data cleared successfully!', {
                  style: {
                    background: theme === 'dark' ? '#374151' : '#FFFFFF',
                    color: theme === 'dark' ? '#FFFFFF' : '#000000',
                  }
                });
              } catch (error) {
                toast.error('Failed to clear random bids data', {
                  style: {
                    background: theme === 'dark' ? '#374151' : '#FFFFFF',
                    color: theme === 'dark' ? '#FFFFFF' : '#000000',
                  }
                });
              }
              toast.dismiss(t.id);
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 
              transition-colors font-medium"
          >
            Yes, Clear
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 
              transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    ), {
      duration: Infinity,
      style: {
        background: theme === 'dark' ? '#1F2937' : '#FFFFFF',
        padding: '1rem',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    });
  };

  const NavLinks = () => (
    <nav className="space-y-2">
      <Link
        to="/adminpage/dashboard"
        onClick={() => setIsMobileMenuOpen(false)}
        className={`flex items-center space-x-3 px-4 py-3 rounded-lg 
          transition-colors ${location.pathname === '/adminpage/dashboard'
            ? 'bg-blue-500 text-white' 
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
      >
        <FaChartLine />
        <span>Admin Dashboard</span>
      </Link>

      <Link
        to="/adminpage/logs"
        onClick={() => setIsMobileMenuOpen(false)}
        className={`flex items-center space-x-3 px-4 py-3 rounded-lg
          transition-colors ${location.pathname === '/adminpage/logs'
            ? 'bg-blue-500 text-white' 
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
      >
        <FaHistory />
        <span>Logs</span>
      </Link>

      <Link
        to="/adminpage/random-bid"
        onClick={() => setIsMobileMenuOpen(false)}
        className={`flex items-center space-x-3 px-4 py-3 rounded-lg
          transition-colors ${location.pathname === '/adminpage/random-bid'
            ? 'bg-blue-500 text-white' 
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
      >
        <FaDice />
        <span>Random Bids</span>
      </Link>

      <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleClearStorage}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg
            text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20
            transition-colors"
        >
          <FaTimes />
          <span>Clear Random Bids</span>
        </button>
      </div>
    </nav>
  );

  return (
    <>
      <div className="hidden lg:block fixed top-0 left-0 h-full w-64 bg-white dark:bg-[#010815] shadow-lg dark:border-r-[1px] dark:border-r-gray-900">
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Admin Panel
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

      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-[#010815] dark:border-b-[1px] dark:border-b-gray-800 shadow-lg z-50">
        <div className="flex items-center justify-between px-4 h-full">
          <h1 className="text-xl font-bold text-gray-800 dark:text-gray-300">
            Admin Panel
          </h1>
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

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 z-50"
            />

            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="lg:hidden fixed top-0 right-0 bottom-0 w-80 bg-white dark:bg-[#010815] shadow-lg z-50 overflow-y-auto"
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-300">Menu</h1>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FaTimes className="text-2xl text-gray-600" />
                  </button>
                </div>
                <div className="flex-grow">
                  <NavLinks />
                </div>
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={handleClearStorage}
                    className="w-full flex items-center justify-center space-x-3 px-4 py-3 rounded-lg
                      text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20
                      transition-colors"
                  >
                    <FaTimes />
                    <span>Clear Random Bids</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminNavbar; 