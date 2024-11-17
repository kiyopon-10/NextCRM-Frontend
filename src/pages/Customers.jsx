import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/data/get-customers', {
          withCredentials: true,
        });
        setCustomers(response.data);
        setFilteredCustomers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch customers.');
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    const filtered = customers.filter((customer) =>
      customer.name?.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    setFilteredCustomers(filtered);
  }, [searchTerm, customers]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Customer List</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading customers...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="table-auto w-full border-collapse">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Total Spending</th>
                <th className="px-4 py-2 text-left">Last Visit</th>
                <th className="px-4 py-2 text-left">Visit Count</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer._id} className="border-t hover:bg-gray-100">
                  <td className="px-4 py-2">{customer._id}</td>
                  <td className="px-4 py-2">{customer.name || 'N/A'}</td>
                  <td className="px-4 py-2">{customer.email || 'N/A'}</td>
                  <td className="px-4 py-2">
                    ${customer.totalSpending ? customer.totalSpending.toFixed(2) : '0.00'}
                  </td>
                  <td className="px-4 py-2">
                    {customer.lastVisit ? new Date(customer.lastVisit).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-4 py-2">{customer.visitCount || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Customers;
