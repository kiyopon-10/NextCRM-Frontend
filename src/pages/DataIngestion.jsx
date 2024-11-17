import React, { useState } from 'react';
import axios from 'axios';

const DataIngestion = () => {
    const [customerData, setCustomerData] = useState({
        name: '',
        email: '',
        totalSpending: 0,
        lastVisit: '',
        visitCount: 0,
    });
    
    const [orderData, setOrderData] = useState({
        customerId: '',
        orderAmount: 0,
        date: '',
    });

    const handleCustomerChange = (e) => {
        setCustomerData({ ...customerData, [e.target.name]: e.target.value });
    };

    const submitCustomerData = async () => {
        try {
            await axios.post('http://localhost:5000/api/data/customers', customerData, {
                withCredentials: true,
              });
            alert('Customer data submitted!');

            setCustomerData({
                name: '',
                email: '',
                totalSpending: 0,
                lastVisit: '',
                visitCount: 0,
            });
        } catch (error) {
            console.error('Error submitting customer data', error);
        }
    };

    const handleOrderChange = (e) => {
        setOrderData({ ...orderData, [e.target.name]: e.target.value });
    };

    const submitOrderData = async () => {
        try {
            console.log("Sending order data:", orderData);
            await axios.post('http://localhost:5000/api/data/orders', orderData ,  {
                withCredentials: true,
              });
            alert('Order data submitted!');

            setOrderData({
                customerId: '',
                orderAmount: 0,
                date: '',
            });
        } catch (error) {
            console.error('Error submitting order data', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">Data Ingestion</h2>
            <div className="flex flex-col md:flex-row gap-6">
                {/* Customer Data Section */}
                <div className="w-full md:w-1/2 p-4 bg-white shadow-lg rounded-lg">
                    <h3 className="text-xl font-medium mb-4 text-blue-500">Customer Data</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium" htmlFor="name">Name</label>
                            <input
                                className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                name="name"
                                value={customerData.name}
                                onChange={handleCustomerChange}
                                placeholder="Enter Customer Name"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium" htmlFor="email">Email</label>
                            <input
                                className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                name="email"
                                value={customerData.email}
                                onChange={handleCustomerChange}
                                placeholder="Enter Customer Email"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium" htmlFor="totalSpending">Total Spending (INR)</label>
                            <input
                                className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                name="totalSpending"
                                type="number"
                                value={customerData.totalSpending}
                                onChange={handleCustomerChange}
                                placeholder="Total Spending"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium" htmlFor="lastVisit">Last Visit Date</label>
                            <input
                                className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                name="lastVisit"
                                type="date"
                                value={customerData.lastVisit}
                                onChange={handleCustomerChange}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium" htmlFor="visitCount">Visit Count</label>
                            <input
                                className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                name="visitCount"
                                type="number"
                                value={customerData.visitCount}
                                onChange={handleCustomerChange}
                                placeholder="Visit Count"
                            />
                        </div>
                        <button
                            onClick={submitCustomerData}
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mt-4"
                        >
                            Submit Customer Data
                        </button>
                    </div>
                </div>

                {/* Order Data Section */}
                <div className="w-full md:w-1/2 p-4 bg-white shadow-lg rounded-lg">
                    <h3 className="text-xl font-medium mb-4 text-blue-500">Order Data</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium" htmlFor="customerId">Customer ID</label>
                            <input
                                className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                name="customerId"
                                value={orderData.customerId}
                                onChange={handleOrderChange}
                                placeholder="Enter Customer ID"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium" htmlFor="orderAmount">Order Amount (INR)</label>
                            <input
                                className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                name="orderAmount"
                                type="number"
                                value={orderData.orderAmount}
                                onChange={handleOrderChange}
                                placeholder="Enter Order Amount"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium" htmlFor="date">Order Date</label>
                            <input
                                className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                name="date"
                                type="date"
                                value={orderData.date}
                                onChange={handleOrderChange}
                            />
                        </div>
                        <button
                            onClick={submitOrderData}
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mt-4"
                        >
                            Submit Order Data
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataIngestion;
