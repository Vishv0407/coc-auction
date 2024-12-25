import React from 'react';
import { FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-lg mt-auto">
      <div className="max-w-7xl mx-auto py-4 px-4">
        <div className="flex justify-center items-center space-x-2 text-lg text-gray-600 dark:text-gray-300">
          <span>Created by</span>
          <a
            href="https://www.linkedin.com/in/vishv-boda-806ab5289/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-blue-500 hover:text-blue-600 
                     dark:text-blue-400 dark:hover:text-blue-300 hover:underline font-medium"
          >
            <span>Vishv Boda</span>
            <FaLinkedin className="inline" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 