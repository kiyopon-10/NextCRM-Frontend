import React from 'react';

const AudienceDetailsPopup = ({ audience, onClose }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 h-3/4 overflow-auto">
          <h2 className="text-2xl font-semibold mb-4">Audience Details</h2>
          <div className="space-y-4">
            {audience.length === 0 ? (
              <p>No audience data available.</p>
            ) : (
              audience.map((customer) => (
                <div key={customer._id} className="border-b pb-2 mb-2">
                  <p><strong>Name:</strong> {customer.name}</p>
                  <p><strong>Email:</strong> {customer.email}</p>
                  <p><strong>Total Spending:</strong> ${customer.totalSpending}</p>
                  <p><strong>Last Visit:</strong> {new Date(customer.lastVisit).toLocaleDateString()}</p>
                  <p><strong>Number of Visits:</strong> {customer.numberOfVisits}</p>
                </div>
              ))
            )}
          </div>
          <button onClick={onClose} className="mt-4 bg-red-500 text-white py-2 px-4 rounded">
            Close
          </button>
        </div>
      </div>
    );
  };

export default AudienceDetailsPopup;
