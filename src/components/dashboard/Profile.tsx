import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import axiosInstance from '../../api/axiosInstance';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
};

interface UserProfile {
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: string;
  postcode?: string;
}

const Profile = () => {
  const { user } = useAuthStore();
  const [profile, setProfile] = useState<UserProfile>({
    email: user?.email || '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    postcode: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    // Load user profile data
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/auth/profile', { headers: getAuthHeader() });
      console.log('Profile response:', response.data); // Debug log
      
      if (response.data) {
        // Handle both direct data and nested data structures
        const userData = response.data.data || response.data;
        setProfile({
          email: userData.email || user?.email || '',
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          phoneNumber: userData.phoneNumber || '',
          address: userData.address || '',
          postcode: userData.postcode || ''
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      // Set default values if API fails
      setProfile({
        email: user?.email || '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        postcode: ''
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const updateData = {
        firstName: profile.firstName,
        lastName: profile.lastName,
        phoneNumber: profile.phoneNumber,
        address: profile.address,
        postcode: profile.postcode
      };
      
      console.log('Sending update data:', updateData); // Debug log
      
      await axiosInstance.patch('/auth/profile', updateData, { headers: getAuthHeader() });
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setIsEditing(false);
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  if (loading && !profile.email) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-gray-500">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading profile...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
            <p className="text-sm text-gray-500">Manage your account information</p>
          </div>
        </div>
        
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
          >
            
            Edit Profile
          </button>
        )}
      </div>

      {/* Message */}
      {message && (
        <div className={`p-4 rounded-md ${
          message.type === 'success' 
            ? 'bg-green-50 border border-green-200 text-green-800' 
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          {message.text}
        </div>
      )}

      {/* Profile Form */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={profile.email}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
          </div>

          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <input
              type="text"
              value={profile.firstName || ''}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              disabled={!isEditing}
              placeholder={isEditing ? "Enter your first name" : ""}
              className={`w-full px-3 py-2 border rounded-md transition-colors duration-200 ${
                isEditing 
                  ? 'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white text-gray-900' 
                  : 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
              }`}
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              type="text"
              value={profile.lastName || ''}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              disabled={!isEditing}
              placeholder={isEditing ? "Enter your last name" : ""}
              className={`w-full px-3 py-2 border rounded-md transition-colors duration-200 ${
                isEditing 
                  ? 'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white text-gray-900' 
                  : 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
              }`}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={profile.phoneNumber || ''}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              disabled={!isEditing}
              placeholder={isEditing ? "Enter your phone number" : ""}
              className={`w-full px-3 py-2 border rounded-md transition-colors duration-200 ${
                isEditing 
                  ? 'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white text-gray-900' 
                  : 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
              }`}
            />
          </div>

          {/* Postcode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Postcode
            </label>
            <input
              type="text"
              value={profile.postcode || ''}
              onChange={(e) => handleInputChange('postcode', e.target.value)}
              disabled={!isEditing}
              placeholder={isEditing ? "Enter your postcode" : ""}
              className={`w-full px-3 py-2 border rounded-md transition-colors duration-200 ${
                isEditing 
                  ? 'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white text-gray-900' 
                  : 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
              }`}
            />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <textarea
              value={profile.address || ''}
              onChange={(e) => handleInputChange('address', e.target.value)}
              disabled={!isEditing}
              placeholder={isEditing ? "Enter your address" : ""}
              rows={3}
              className={`w-full px-3 py-2 border rounded-md transition-colors duration-200 ${
                isEditing 
                  ? 'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white text-gray-900' 
                  : 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'
              }`}
            />
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={() => {
                setIsEditing(false);
                loadProfile(); // Reset to original values
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
            >
              {loading && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile; 