import React from 'react';

const Dashboard = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="text-center bg-white p-8 rounded-lg shadow-xl max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to <span className="text-blue-500">NextCRM</span></h1>
        <p className="text-gray-600 text-lg mb-6">
          Your one-stop solution for managing campaigns, audiences, customers, and orders seamlessly.  
          Boost your efficiency with advanced tools and insights designed to help your business thrive.
        </p>
        <div className="flex justify-center space-x-4">
          <a 
            href="/campaign"
            className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Manage Campaigns
          </a>
          <a 
            href="/audience"
            className="px-6 py-3 bg-gray-100 text-blue-500 font-medium rounded-lg shadow-md hover:bg-gray-200 transition"
          >
            Create Campaigns
          </a>
        </div>
        <div className="mt-8 text-sm text-gray-500">
          <p>Need assistance? Visit our <a href="/help" className="text-blue-500 underline hover:text-blue-600">Help Center</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
