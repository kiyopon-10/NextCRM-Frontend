import React, { useState } from 'react';
import axios from 'axios';

const CampaignForm = ({ onCampaignCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [minSpending, setMinSpending] = useState('');
  const [maxSpending, setMaxSpending] = useState('');
  const [lastVisit, setLastVisit] = useState('');
  const [lastVisitCriteria, setLastVisitCriteria] = useState('before');
  const [minVisits, setMinVisits] = useState('');
  const [maxVisits, setMaxVisits] = useState('');

  const handleCreateCampaign = async () => {
    const campaignData = {
      name: name,
      description: description,
      targetAudience: {}
    };
  
    // Add spending criteria if they exist
    if (minSpending) campaignData.targetAudience.spending = { min: parseFloat(minSpending) };
    if (maxSpending) {
      campaignData.targetAudience.spending = campaignData.targetAudience.spending || {};
      campaignData.targetAudience.spending.max = parseFloat(maxSpending);
    }
  
    // Set `before` or `after` date based on the selected criteria
    if (lastVisit) {
      campaignData.targetAudience.lastVisit = {};
      if (lastVisitCriteria === 'before') {
        campaignData.targetAudience.lastVisit.before = lastVisit;
      } else if (lastVisitCriteria === 'after') {
        campaignData.targetAudience.lastVisit.after = lastVisit;
      }
    }
  
    // Add visits criteria if they exist
    if (minVisits) campaignData.targetAudience.visits = { min: parseInt(minVisits) };
    if (maxVisits) {
      campaignData.targetAudience.visits = campaignData.targetAudience.visits || {};
      campaignData.targetAudience.visits.max = parseInt(maxVisits);
    }
  
    // Send campaign data to backend...
    try {
      const response = await axios.post('http://localhost:5000/api/data/create-campaign', campaignData, {
        withCredentials: true, // Ensure cookies are sent along with the request
      });
      if (response.data) {
        console.log('Campaign created:', response.data.campaign);
        onCampaignCreated();

        setName('');
        setDescription('');
        setMinSpending('');
        setMaxSpending('');
        setLastVisit('');
        setLastVisitCriteria('before');
        setMinVisits('');
        setMaxVisits('');
      }
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
  };
  

  return (
    <div className="bg-white shadow-lg rounded-lg p-3 mx-auto w-full">
      <h3 className="text-lg font-semibold mb-2">Create New Campaign</h3>

      <div className="mb-1">
        <label className="block text-sm font-medium mb-0.5" htmlFor="name">Campaign Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded text-sm"
        />
      </div>

      <div className="mb-1">
        <label className="block text-sm font-medium mb-0.5" htmlFor="description">Campaign Description</label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded text-sm"
        />
      </div>

      <div className="mb-1 flex space-x-2">
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-0.5" htmlFor="minSpending">Min Spending</label>
          <input
            id="minSpending"
            type="number"
            value={minSpending}
            onChange={(e) => setMinSpending(e.target.value)}
            className="w-full p-2 border rounded text-sm"
          />
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-0.5" htmlFor="maxSpending">Max Spending</label>
          <input
            id="maxSpending"
            type="number"
            value={maxSpending}
            onChange={(e) => setMaxSpending(e.target.value)}
            className="w-full p-2 border rounded text-sm"
          />
        </div>
      </div>

      <div className="mb-1 flex space-x-2">
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-0.5" htmlFor="lastVisitCriteria">Last Visit</label>
          <select
            id="lastVisitCriteria"
            value={lastVisitCriteria}
            onChange={(e) => setLastVisitCriteria(e.target.value)}
            className="w-full p-2 border rounded text-sm"
          >
            <option value="before">Before</option>
            <option value="after">After</option>
          </select>
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-0.5" htmlFor="lastVisit">Date</label>
          <input
            id="lastVisit"
            type="date"
            value={lastVisit}
            onChange={(e) => setLastVisit(e.target.value)}
            className="w-full p-2 border rounded text-sm"
          />
        </div>
      </div>

      <div className="mb-1 flex space-x-2">
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-0.5" htmlFor="minVisits">Min Visits</label>
          <input
            id="minVisits"
            type="number"
            value={minVisits}
            onChange={(e) => setMinVisits(e.target.value)}
            className="w-full p-2 border rounded text-sm"
          />
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-0.5" htmlFor="maxVisits">Max Visits</label>
          <input
            id="maxVisits"
            type="number"
            value={maxVisits}
            onChange={(e) => setMaxVisits(e.target.value)}
            className="w-full p-2 border rounded text-sm"
          />
        </div>
      </div>

      <button
        onClick={handleCreateCampaign}
        className="w-full bg-blue-500 text-white p-2 rounded text-sm font-medium mt-3"
      >
        Create Campaign
      </button>
    </div>
  );
};

export default CampaignForm;
