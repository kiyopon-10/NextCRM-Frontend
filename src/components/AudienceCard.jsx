import React from 'react';

const AudienceCard = ({ title, count, description }) => (
  <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    <p className="text-2xl font-bold text-blue-500 mt-2">{count}</p>
    <p className="text-sm text-gray-600 mt-1">{description}</p>
  </div>
);

export default AudienceCard;
