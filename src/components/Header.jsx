// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white shadow-md">
      {/* Left Side - Logo */}
      <div className="text-2xl font-bold text-blue-400 pl-4">
        NextCRM
      </div>

      {/* Right Side - Navbar */}
      <nav>
        <ul className="flex gap-6">
          <li>
            <Link className="text-white hover:text-blue-300" to="/">Home</Link>
          </li>
          <li>
            <Link className="text-white hover:text-blue-300" to="/data-ingestion">Data Ingestion</Link>
          </li>
          <li>
            <Link className="text-white hover:text-blue-300" to="/audience">Create Campaigns</Link>
          </li>
          <li>
            <Link className="text-white hover:text-blue-300" to="/campaign">Campaign Management</Link>
          </li>
          <li>
            <Link className="text-white hover:text-blue-300" to="/customers">Customers</Link>
          </li>
          <li>
            <Link className="text-white hover:text-blue-300" to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
