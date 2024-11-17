import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md mb-5 ">
      <div className="container mx-auto">
        <ul className="flex gap-6 justify-center">
          <li>
            <Link 
              className="text-lg text-blue-300 hover:text-white hover:underline transition duration-200" 
              to="/"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              className="text-lg text-blue-300 hover:text-white hover:underline transition duration-200" 
              to="/data-ingestion"
            >
              Data Ingestion
            </Link>
          </li>
          <li>
            <Link 
              className="text-lg text-blue-300 hover:text-white hover:underline transition duration-200" 
              to="/audience"
            >
              Audience Management
            </Link>
          </li>
          <li>
            <Link 
              className="text-lg text-blue-300 hover:text-white hover:underline transition duration-200" 
              to="/campaign"
            >
              Campaign Management
            </Link>
          </li>
          <li>
            <Link 
              className="text-lg text-blue-300 hover:text-white hover:underline transition duration-200" 
              to="/statistics"
            >
              Statistics
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
