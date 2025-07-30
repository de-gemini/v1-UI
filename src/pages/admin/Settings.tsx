import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaSave, FaEnvelope, FaBan, FaClock, FaCog } from 'react-icons/fa';
import { systemSettingsService, type SystemSettings, type ReminderEmailSettings, type BookingPreventionSettings } from '../../api/systemSettings';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingReminder, setSavingReminder] = useState(false);
  const [savingBookingPrevention, setSavingBookingPrevention] = useState(false);

  // Reminder Email Settings
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [reminderFrequency, setReminderFrequency] = useState<'none' | '4hours' | '12hours' | '24hours' | 'custom'>('none');
  const [customHours, setCustomHours] = useState<number>(24);

  // Booking Prevention Settings
  const [bookingPreventionEnabled, setBookingPreventionEnabled] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const response = await systemSettingsService.getSettings();
      const settingsData = response.payload;
      setSettings(settingsData);

      // Set reminder email settings
      setReminderEnabled(settingsData.settings.reminderEmails.enabled);
      setReminderFrequency(settingsData.settings.reminderEmails.frequency);
      setCustomHours(settingsData.settings.reminderEmails.customHours || 24);

      // Set booking prevention settings
      setBookingPreventionEnabled(settingsData.settings.bookingPrevention.enabled);
    } catch (error) {
      console.error('Failed to load settings:', error);
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const saveReminderSettings = async () => {
    try {
      setSavingReminder(true);
      const reminderSettings: ReminderEmailSettings = {
        enabled: reminderEnabled,
        frequency: reminderFrequency,
        customHours: reminderFrequency === 'custom' ? customHours : undefined,
      };

      await systemSettingsService.updateReminderEmails(reminderSettings);
      toast.success('Reminder email settings saved successfully');
    } catch (error) {
      console.error('Failed to save reminder settings:', error);
      toast.error('Failed to save reminder settings');
    } finally {
      setSavingReminder(false);
    }
  };

  const saveBookingPreventionSettings = async () => {
    try {
      setSavingBookingPrevention(true);
      const preventionSettings: BookingPreventionSettings = {
        enabled: bookingPreventionEnabled,
      };

      await systemSettingsService.updateBookingPrevention(preventionSettings);
      toast.success('Booking prevention settings saved successfully');
    } catch (error) {
      console.error('Failed to save booking prevention settings:', error);
      toast.error('Failed to save booking prevention settings');
    } finally {
      setSavingBookingPrevention(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-gray-500">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading settings...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FaCog className="text-blue-600" />
            System Settings
          </h1>
          <p className="text-gray-600 mt-2">Configure your business settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Reminder Email Settings */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <FaEnvelope className="text-blue-600 text-xl" />
              <h2 className="text-xl font-semibold text-gray-900">Reminder Emails</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Enable Reminder Emails</label>
                <button
                  onClick={() => setReminderEnabled(!reminderEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    reminderEnabled ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      reminderEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {reminderEnabled && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reminder Frequency
                    </label>
                    <select
                      value={reminderFrequency}
                      onChange={(e) => setReminderFrequency(e.target.value as any)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="none">No reminders</option>
                      <option value="4hours">4 hours after booking</option>
                      <option value="12hours">12 hours after booking</option>
                      <option value="24hours">24 hours after booking</option>
                      <option value="custom">Custom hours</option>
                    </select>
                  </div>

                  {reminderFrequency === 'custom' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Custom Hours
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="168"
                        value={customHours}
                        onChange={(e) => setCustomHours(parseInt(e.target.value))}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter hours (1-168)"
                      />
                    </div>
                  )}
                </div>
              )}

                             <button
                 onClick={saveReminderSettings}
                 disabled={savingReminder}
                 className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 flex items-center justify-center gap-2"
               >
                 {savingReminder ? (
                   <>
                     <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                     </svg>
                     Saving...
                   </>
                 ) : (
                   <>
                     <FaSave />
                     Save Reminder Settings
                   </>
                 )}
               </button>
            </div>
          </div>

          {/* Booking Prevention Settings */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <FaBan className="text-red-600 text-xl" />
              <h2 className="text-xl font-semibold text-gray-900">Booking Prevention</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Prevent New Bookings</label>
                <button
                  onClick={() => setBookingPreventionEnabled(!bookingPreventionEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    bookingPreventionEnabled ? 'bg-red-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      bookingPreventionEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>



                             <button
                 onClick={saveBookingPreventionSettings}
                 disabled={savingBookingPrevention}
                 className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 flex items-center justify-center gap-2"
               >
                 {savingBookingPrevention ? (
                   <>
                     <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                     </svg>
                     Saving...
                   </>
                 ) : (
                   <>
                     <FaSave />
                     Save Booking Prevention Settings
                   </>
                 )}
               </button>
            </div>
          </div>
        </div>

        {/* Current Settings Display */}
        {settings && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <FaClock className="text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Current Settings</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Reminder Emails:</p>
                <p className="font-medium">
                  {settings.settings.reminderEmails.enabled ? 'Enabled' : 'Disabled'}
                  {settings.settings.reminderEmails.enabled && (
                    <span className="ml-2 text-gray-500">
                      ({settings.settings.reminderEmails.frequency === 'custom' 
                        ? `${settings.settings.reminderEmails.customHours} hours` 
                        : settings.settings.reminderEmails.frequency})
                    </span>
                  )}
                </p>
              </div>
              
              <div>
                <p className="text-gray-600">Booking Prevention:</p>
                <p className="font-medium">
                  {settings.settings.bookingPrevention.enabled ? 'Enabled' : 'Disabled'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings; 