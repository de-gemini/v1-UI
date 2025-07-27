import React, { useState } from 'react';

interface CallOrChatProps {
  onTabChange?: (tab: 'chat') => void;
}

const CallOrChat: React.FC<CallOrChatProps> = ({ onTabChange }) => {
  const [selectedMethod, setSelectedMethod] = useState<'call' | 'chat' | 'email'>('call');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ type: 'user' | 'support'; message: string; time: string }>>([
    {
      type: 'support',
      message: 'Hello! How can we help you today?',
      time: new Date().toLocaleTimeString()
    }
  ]);

  const supportMethods = [
    {
      id: 'call',
      title: 'Call Us',
      description: 'Speak directly with our support team',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      action: 'Call Now',
      value: '07867388142',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-700'
    },
    {
      id: 'chat',
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      action: 'Start Chat',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-700'
    },
    {
      id: 'email',
      title: 'Email Support',
      description: 'Send us an email and we\'ll respond within 24 hours',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      action: 'Send Email',
      value: 'support@degeminiservices.co.uk',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-700'
    }
  ];

  const handleMethodSelect = (method: 'call' | 'chat' | 'email') => {
    setSelectedMethod(method);
    if (method === 'chat' && onTabChange) {
      onTabChange('chat');
    } else if (method === 'chat') {
      setIsChatOpen(true);
    }
  };

  const handleCall = () => {
    window.location.href = `tel:+442012345678`;
  };

  const handleEmail = () => {
    window.location.href = `mailto:support@geminicleaning.com?subject=Support Request`;
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const newMessage = {
      type: 'user' as const,
      message: chatMessage,
      time: new Date().toLocaleTimeString()
    };

    setChatHistory(prev => [...prev, newMessage]);
    setChatMessage('');

    // Simulate support response
    setTimeout(() => {
      const supportResponse = {
        type: 'support' as const,
        message: 'Thank you for your message. Our support team will get back to you shortly.',
        time: new Date().toLocaleTimeString()
      };
      setChatHistory(prev => [...prev, supportResponse]);
    }, 1000);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center">
        <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mr-4">
          <svg className="w-6 h-6 text-orange-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Call or Mail</h2>
          <p className="text-sm text-gray-500">Get help from our support team</p>
        </div>
      </div>

      {/* Support Methods */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {supportMethods.map((method) => (
          <div
            key={method.id}
            className={`bg-white rounded-xl border-2 p-6 cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedMethod === method.id
                ? 'border-blue-500 shadow-md'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handleMethodSelect(method.id as 'call' | 'chat' | 'email')}
          >
            <div className={`w-12 h-12 ${method.bgColor} rounded-full flex items-center justify-center mb-4`}>
              <div className={method.iconColor}>
                {method.icon}
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{method.description}</p>
            {method.value && (
              <p className="text-sm font-medium text-gray-900 mb-4">{method.value}</p>
            )}
            <button
              className={`w-full px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                selectedMethod === method.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                if (method.id === 'call') handleCall();
                else if (method.id === 'email') handleEmail();
                else if (method.id === 'chat' && onTabChange) {
                  onTabChange('chat');
                } else if (method.id === 'chat') {
                  setIsChatOpen(true);
                }
              }}
            >
              {method.action}
            </button>
          </div>
        ))}
      </div>


      {/* FAQ Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <div className="border-b border-gray-100 pb-4">
            <h4 className="font-medium text-gray-900 mb-2">What are your operating hours?</h4>
            <p className="text-sm text-gray-600">Our support team is available Monday to Friday, 8 AM to 6 PM GMT. For urgent matters outside these hours, please leave a message and we'll get back to you as soon as possible.</p>
          </div>
          <div className="border-b border-gray-100 pb-4">
            <h4 className="font-medium text-gray-900 mb-2">How can I reschedule my booking?</h4>
            <p className="text-sm text-gray-600">You can reschedule your booking through your dashboard or by contacting our support team. Please provide at least 24 hours notice for any changes.</p>
          </div>
          <div className="border-b border-gray-100 pb-4">
            <h4 className="font-medium text-gray-900 mb-2">What if I need to cancel my booking?</h4>
            <p className="text-sm text-gray-600">Cancellations can be made up to 24 hours before your scheduled appointment. Please refer to our cancellation policy for more details.</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">How do I report an issue with my service?</h4>
            <p className="text-sm text-gray-600">If you have any issues with your cleaning service, please contact us immediately through any of the methods above. We'll work to resolve the issue as quickly as possible.</p>
          </div>
        </div>
      </div>

      {/* Live Chat Modal */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-end p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md h-96 flex flex-col">
            {/* Chat Header */}
            <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Live Chat</h3>
                  <p className="text-sm opacity-90">Support Team</p>
                </div>
              </div>
              <button
                onClick={closeChat}
                className="text-white hover:text-gray-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {chatHistory.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg ${
                      msg.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    <p className={`text-xs mt-1 ${
                      msg.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleChatSubmit} className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CallOrChat; 