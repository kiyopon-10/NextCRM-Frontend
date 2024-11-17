import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      setUserInfo(user);
      console.log(user)
    } else {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:5000/auth/logout', { withCredentials: true });
      setIsAuthenticated(false);
      setUserInfo(null);
      navigate('/login');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  const getUserInitial = (displayName) => {
    if (displayName && displayName.length > 0) {
      return displayName.charAt(0).toUpperCase();
    }
    return 'U';
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-3xl font-semibold text-center mb-8">Profile</h2>

      <div className="flex justify-center mb-6">
        {userInfo.profilePicture ? (
          <img
            src={userInfo.profilePicture}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-white text-3xl">
            {getUserInitial(userInfo.displayName)}
          </div>
        )}
      </div>

      <div className="mb-6">
        <p className="text-lg font-semibold">Name:</p>
        <p className="text-gray-600">{userInfo.displayName || 'No Name Provided'}</p>
      </div>

      <div className="mb-6">
        <p className="text-lg font-semibold">Email:</p>
        <p className="text-gray-600">{userInfo.email || 'No Email Provided'}</p>
      </div>

      <div className="mb-6">
        <p className="text-lg font-semibold">Member Since:</p>
        <p className="text-gray-600">{new Date(userInfo.createdAt).toLocaleDateString()}</p>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={handleLogout}
          className="w-full sm:w-auto bg-red-500 text-white py-2 px-6 rounded-lg text-lg font-medium hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
