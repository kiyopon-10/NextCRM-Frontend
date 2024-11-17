import React, { useEffect, useState } from 'react';
import axios from 'axios';

import AudienceDetailsPopup from '../components/AudienceDetailsPopup';

const CampaignManagement = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedAudience, setSelectedAudience] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/data/get-campaigns', {
          withCredentials: true,
        });
  
        console.log(response.data);
  
        if (Array.isArray(response.data)) {
          const campaignsWithStats = await Promise.all(
            response.data.map(async (campaign) => {
              try {
                const statsResponse = await axios.get(
                  `http://localhost:5000/api/data/campaign/${campaign._id}/statistics`,
                  { withCredentials: true }
                );
                return {
                  ...campaign,
                  statistics: statsResponse.data.data,
                };
              } catch (error) {
                console.error(`Error fetching statistics for campaign ${campaign._id}:`, error.response || error);
                return { ...campaign, statistics: null };
              }
            })
          );
  
          campaignsWithStats.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
          setCampaigns(campaignsWithStats);
        } else {
          console.error("Expected an array, but got:", response.data);
        }
      } catch (error) {
        console.error("Error fetching campaigns:", error.response || error);
      }
    };
  
    fetchCampaigns();
  }, []);
  

  const handleViewAudience = async (campaignId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/data/campaign/${campaignId}/audience`,
        { withCredentials: true }
      );
      setSelectedAudience(response.data.data);
      setIsPopupVisible(true);
    } catch (error) {
      console.error(`Error fetching audience for campaign ${campaignId}:`, error.response || error);
    }
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
    setSelectedAudience(null);
  };

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-semibold mb-4">Past Campaigns</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {campaigns.map((campaign) => (
          <div key={campaign._id} className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">{campaign.name}</h3>
            <p className="text-sm mb-2 text-gray-600">{campaign.description}</p>

            <div className="text-sm text-gray-700">
              <p><strong>Members:</strong> {campaign.members || 'N/A'}</p>
              <p><strong>Created At:</strong> {new Date(campaign.createdAt).toLocaleDateString()}</p>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold">Target Audience Criteria:</h4>
              <ul className="text-sm text-gray-600">
                {campaign.targetAudience && campaign.targetAudience.spending && (
                  <li>Spending: 
                    {campaign.targetAudience.spending.min ? ` Min $${campaign.targetAudience.spending.min}` : ''}
                    {campaign.targetAudience.spending.max ? ` Max $${campaign.targetAudience.spending.max}` : ''}
                  </li>
                )}
                {campaign.targetAudience && campaign.targetAudience.lastVisit && (
                  <li>Last Visit:
                    {campaign.targetAudience.lastVisit.before ? ` Before ${new Date(campaign.targetAudience.lastVisit.before).toLocaleDateString()}` : ''}
                    {campaign.targetAudience.lastVisit.after ? ` After ${new Date(campaign.targetAudience.lastVisit.after).toLocaleDateString()}` : ''}
                  </li>
                )}
                {campaign.targetAudience && campaign.targetAudience.visits && (
                  <li>Visits:
                    {campaign.targetAudience.visits.min ? ` Min ${campaign.targetAudience.visits.min}` : ''}
                    {campaign.targetAudience.visits.max ? ` Max ${campaign.targetAudience.visits.max}` : ''}
                  </li>
                )}
              </ul>
            </div>


            {campaign.statistics ? (
              <div className="mt-4 bg-gray-100 p-3 rounded">
                <h4 className="font-semibold mb-2">Statistics:</h4>
                <p><strong>Audience Size:</strong> {campaign.statistics.audienceSize}</p>
                <p><strong>Sent:</strong> {campaign.statistics.sent}</p>
                <p><strong>Failed:</strong> {campaign.statistics.failed}</p>
              </div>
            ) : (
              <p className="mt-4 text-red-500">Statistics unavailable</p>
            )}

            <div className="mt-4">
              <button 
                onClick={() => handleViewAudience(campaign._id)} 
                className="w-full bg-blue-500 text-white py-2 rounded text-sm font-medium"
              >
                View Audience Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {isPopupVisible && selectedAudience && (
        <AudienceDetailsPopup audience={selectedAudience} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default CampaignManagement;
