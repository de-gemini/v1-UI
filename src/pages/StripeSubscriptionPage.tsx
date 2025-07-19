import React, { useState, useEffect } from 'react';
import UnifiedStripePaymentForm from '../components/UnifiedStripePaymentForm';
import { getCustomerSubscriptions, cancelSubscription, pauseSubscription, resumeSubscription } from '../api/stripePayment';
import { toast } from 'react-toastify';
import { useAuthStore } from '../store/authStore';
import { useCheckoutStore, useEstimatedPrice } from '../store/checkoutStore';
import { useNavigate } from 'react-router-dom';
import { Frequency } from './Checkout/ckeckoutData';

interface Subscription {
  id: string;
  status: string;
  current_period_start: number;
  current_period_end: number;
  items: any[];
  metadata: Record<string, string>;
}

const StripeSubscriptionPage: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuthStore();
  const navigate = useNavigate();
  
  // Get checkout store data
  const { selectedFrequency, roomCounts } = useCheckoutStore();
  const estimatedPrice = useEstimatedPrice();

  const loadSubscriptions = async () => {
    if (!user?.email) return;
    
    setLoading(true);
    try {
      // For demo purposes, we'll use a mock customer ID
      // In a real app, you'd store the customer ID in your user profile
      const mockCustomerId = 'cus_mock_' + user.id;
      const response = await getCustomerSubscriptions(mockCustomerId);
      
      if (response.success) {
        setSubscriptions(response.data);
      }
    } catch (error: any) {
      console.error('Error loading subscriptions:', error);
      toast.error('Failed to load subscriptions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubscriptions();
  }, [user]);

  const handleSubscriptionAction = async (subscriptionId: string, action: 'cancel' | 'pause' | 'resume') => {
    try {
      let response;
      switch (action) {
        case 'cancel':
          response = await cancelSubscription(subscriptionId);
          break;
        case 'pause':
          response = await pauseSubscription(subscriptionId);
          break;
        case 'resume':
          response = await resumeSubscription(subscriptionId);
          break;
      }

      if (response.success) {
        toast.success(`Subscription ${action}ed successfully`);
        loadSubscriptions(); // Reload subscriptions
      } else {
        toast.error(response.message || `Failed to ${action} subscription`);
      }
    } catch (error: any) {
      console.error(`Error ${action}ing subscription:`, error);
      toast.error(`Failed to ${action} subscription`);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      active: 'bg-green-100 text-green-800',
      canceled: 'bg-red-100 text-red-800',
      incomplete: 'bg-yellow-100 text-yellow-800',
      past_due: 'bg-orange-100 text-orange-800',
      paused: 'bg-gray-100 text-gray-800',
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  const handleSubscriptionSuccess = (subscriptionId: string, customerId: string) => {
    toast.success('Subscription created successfully!');
    setShowForm(false);
    loadSubscriptions();
  };

  const handleSubscriptionError = (error: string) => {
    toast.error(error);
  };

  const getFrequencyName = () => {
    switch (selectedFrequency) {
      case Frequency.WEEKLY:
        return 'Weekly';
      case Frequency.FORTNIGHTLY:
        return 'Bi-weekly';
      case Frequency.MONTHLY:
        return 'Monthly';
      default:
        return 'Subscription';
    }
  };

  const hasRoomSelection = Object.values(roomCounts).some(count => count > 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Subscription Management</h1>
          <p className="mt-2 text-gray-600">Manage your cleaning service subscriptions</p>
        </div>

        {/* Dynamic Subscription Creation */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Create New Subscription</h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              {showForm ? 'Cancel' : 'New Subscription'}
            </button>
          </div>

          {showForm && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              {!hasRoomSelection ? (
                <div className="text-center py-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Configure Your Service First</h3>
                  <p className="text-gray-600 mb-6">
                    Please select your rooms and preferences before creating a subscription.
                  </p>
                  <button
                    onClick={() => navigate('/checkout')}
                    className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
                  >
                    Go to Checkout
                  </button>
                </div>
              ) : selectedFrequency === null ? (
                <div className="text-center py-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Select Frequency</h3>
                  <p className="text-gray-600 mb-6">
                    Please select a frequency for your subscription.
                  </p>
                  <button
                    onClick={() => navigate('/checkout')}
                    className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
                  >
                    Go to Checkout
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {getFrequencyName()} Cleaning Subscription
                  </h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-800 font-medium">Estimated Price:</span>
                      <span className="text-blue-900 font-bold text-xl">£{estimatedPrice.toFixed(2)}</span>
                    </div>
                    <div className="text-sm text-blue-700 mt-2">
                      Based on your room selection and add-ons
                    </div>
                  </div>
                  <UnifiedStripePaymentForm
                    mode="subscription"
                    amount={estimatedPrice}
                    currency="gbp"
                    frequency={
                      selectedFrequency === Frequency.WEEKLY || selectedFrequency === Frequency.FORTNIGHTLY
                        ? 'week'
                        : selectedFrequency === Frequency.MONTHLY
                        ? 'month'
                        : undefined
              
                      }
                    intervalCount={selectedFrequency === Frequency.FORTNIGHTLY ? 2 : 1}
                    productName={`${getFrequencyName()} Cleaning Service`}
                    customerEmail={user?.email || ''}
                    customerName={user?.name || ''}
                    metadata={{
                      serviceType: 'cleaning',
                      customerId: user?.id || '',
                      roomCounts: JSON.stringify(roomCounts),
                    }}
                    onSuccess={(result) => {
                      toast.success('Subscription created successfully!');
                      setShowForm(false);
                      loadSubscriptions();
                    }}
                    onError={handleSubscriptionError}
                    onClose={() => setShowForm(false)}
                  />
                </div>
              )}
            </div>
          )}

          {/* Quick Setup Guide */}
          {!showForm && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">How to Create a Subscription</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">1</div>
                  <div>
                    <p className="font-medium text-gray-900">Configure Your Service</p>
                    <p className="text-gray-600">Go to checkout and select your rooms, add-ons, and frequency</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">2</div>
                  <div>
                    <p className="font-medium text-gray-900">Create Subscription</p>
                    <p className="text-gray-600">Return here and click "New Subscription" to set up recurring payments</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">3</div>
                  <div>
                    <p className="font-medium text-gray-900">Manage Your Subscription</p>
                    <p className="text-gray-600">Pause, resume, or cancel your subscription anytime</p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => navigate('/checkout')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
                >
                  Start Configuration
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Current Subscriptions */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Your Subscriptions</h2>
          </div>
          
          {loading ? (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading subscriptions...</p>
            </div>
          ) : subscriptions.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-gray-600">No active subscriptions found.</p>
              <button
                onClick={() => setShowForm(true)}
                className="mt-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                Create your first subscription
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {subscriptions.map((subscription) => (
                <div key={subscription.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-medium text-gray-900">
                          Subscription #{subscription.id.slice(-8)}
                        </h3>
                        {getStatusBadge(subscription.status)}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Current period: {formatDate(subscription.current_period_start)} - {formatDate(subscription.current_period_end)}
                      </p>
                      {subscription.metadata.serviceType && (
                        <p className="text-sm text-gray-600">
                          Service: {subscription.metadata.serviceType}
                        </p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      {subscription.status === 'active' && (
                        <>
                          <button
                            onClick={() => handleSubscriptionAction(subscription.id, 'pause')}
                            className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                          >
                            Pause
                          </button>
                          <button
                            onClick={() => handleSubscriptionAction(subscription.id, 'cancel')}
                            className="px-3 py-1 text-sm border border-red-300 text-red-700 rounded-md hover:bg-red-50 transition-colors"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      {subscription.status === 'paused' && (
                        <button
                          onClick={() => handleSubscriptionAction(subscription.id, 'resume')}
                          className="px-3 py-1 text-sm border border-green-300 text-green-700 rounded-md hover:bg-green-50 transition-colors"
                        >
                          Resume
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StripeSubscriptionPage; 