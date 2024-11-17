import React, { useEffect, useState } from 'react';
import AudienceCard from '../components/AudienceCard';
import CampaignForm from '../components/CampaignForm';
import CampaignCard from '../components/CampaignCard';
import axios from 'axios';

const AudienceManagement = () => {
  const [audienceData, setAudienceData] = useState({
    highValue: 0,
    loyalLowFrequency: 0,
    dormant: 0,
    newCustomers: 0,
  });
  const [campaigns, setCampaigns] = useState([]);
  const [lastCampaign, setLastCampaign] = useState(null);
  const [created, setCreated] = useState(0);

  useEffect(() => {
    const fetchAudienceData = async () => {
      try {
        const [highValueRes, loyalLowFreqRes, dormantRes, newCustomersRes] = await Promise.all([
          axios.get('http://localhost:5000/api/audience/segments/high-value', {
            withCredentials: true,
          }),
          axios.get('http://localhost:5000/api/audience/segments/loyal-low-frequency', {
            withCredentials: true,
          }),
          axios.get('http://localhost:5000/api/audience/segments/dormant', {
            withCredentials: true,
          }),
          axios.get('http://localhost:5000/api/audience/segments/new-customers', {
            withCredentials: true,
          })
        ]);

        await axios.get('http://localhost:5000/api/data/get-campaigns', {
          withCredentials: true,
        });
  
        setAudienceData({
          highValue: highValueRes.data.count,
          loyalLowFrequency: loyalLowFreqRes.data.count,
          dormant: dormantRes.data.count,
          newCustomers: newCustomersRes.data.count,
        });
      } catch (error) {
        console.error('Error fetching audience data:', error);
      }
    };
  
    fetchAudienceData();
  }, []);

  // Fetch all campaigns 
  useEffect(() => {
    const getCampaigns = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/data/get-campaigns', {
          withCredentials: true,
        });
        setCampaigns(res.data);
        if (res.data.length > 0) {
          setLastCampaign(res.data[res.data.length - 1]);
        }
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };
  
    getCampaigns();
  }, [created]);

  return (
    <div className="flex gap-6 p-6">
      {/* Left Section - Audience Segments */}
      <div className="w-1/3 space-y-4">
        <AudienceCard title="High-Value Customers" count={audienceData.highValue} description="Top spenders with exclusive offers" />
        <AudienceCard title="Loyal Customers (Low Visit Frequency)" count={audienceData.loyalLowFrequency} description="High spending, but infrequent visits" />
        <AudienceCard title="Dormant Customers" count={audienceData.dormant} description="Inactive for over 3 months" />
        <AudienceCard title="New Customers" count={audienceData.newCustomers} description="Recently signed up" />
      </div>

      {/* Right Section - Campaign Creation and Display */}
      <div className="w-2/3 space-y-4">
        <CampaignForm onCampaignCreated={() => setCreated(created + 1)} />
        
        {/* Show last created campaign below the form */}
        {lastCampaign && (
          <div className="mt-6 space-y-4">
            <h3 className="text-xl font-semibold">Last Created Campaign</h3>
            <CampaignCard
              key={lastCampaign._id}
              name={lastCampaign.name}
              description={lastCampaign.description || "Custom campaign based on selected criteria"}
              targetCount={lastCampaign.members || 0}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AudienceManagement;
