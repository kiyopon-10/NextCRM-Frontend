import React from 'react';

const CampaignCard = ({ name, description, targetCount }) => (
  <div className="bg-gray-200 shadow-lg rounded-lg p-4 mb-4">
    <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
    <p className="text-sm text-gray-600 mt-1">{description}</p>
    <p className="text-xl text-green-500 mt-2">Target Audience: {targetCount}</p>
  </div>
);

export default CampaignCard;
