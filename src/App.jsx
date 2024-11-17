// src/App.jsx
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import DataIngestion from './pages/DataIngestion';
import AudienceManagement from './pages/AudienceManagement';
import CampaignManagement from './pages/CampaignManagement';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Customers from './pages/Customers';

function App() {
  return (
    <AuthProvider>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/data-ingestion" 
              element={
                <ProtectedRoute>
                  <DataIngestion />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/audience" 
              element={
                <ProtectedRoute>
                  <AudienceManagement />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/campaign" 
              element={
                <ProtectedRoute>
                  <CampaignManagement />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/customers" 
              element={
                <ProtectedRoute>
                  <Customers />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
    </AuthProvider>
  );
}

export default App;
