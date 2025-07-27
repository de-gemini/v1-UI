import React, { useState, useEffect, useRef } from 'react';
import { useAuthStore } from '../../store/authStore';
import { getUserChat, sendUserMessage, startChat } from '../../api/chat';

interface ChatMessage {
  senderId: string;
  senderName: string;
  senderRole: 'user' | 'admin';
  message: string;
  timestamp: string;
}

interface ChatData {
  _id: string;
  userId: string;
  userEmail: string;
  userName: string;
  messages: ChatMessage[];
  isResolved: boolean;
  lastMessageAt: string;
}

const Chat = () => {
  const { user } = useAuthStore();
  const [chat, setChat] = useState<ChatData | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    loadChat();
  }, []);

//   useEffect(() => {
//     scrollToBottom();
//   }, [chat?.messages]);

  const loadChat = async () => {
    try {
      setLoading(true);
      console.log('🔄 [loadChat] Starting to load chat for user:', user?.id);
      console.log('🔄 [loadChat] User object:', user);
      
      const response = await getUserChat();
      console.log('🔄 [loadChat] API response received:', response);
      console.log('🔄 [loadChat] Response structure:', {
        success: response.success,
        statusCode: response.statusCode,
        hasData: !!response.data,
        hasPayload: !!response.payload,
        data: response.data,
        payload: response.payload
      });
      
      if ((response.success || response.statusCode === 200) && (response.data || response.payload)) {
        const chatData = response.data || response.payload;
        console.log('✅ [loadChat] Setting chat data:', chatData);
        console.log('✅ [loadChat] Chat messages count:', chatData.messages?.length || 0);
        console.log('✅ [loadChat] Chat messages:', chatData.messages);
        setChat(chatData);
      } else {
        console.log('❌ [loadChat] No chat found or error in response');
        console.log('❌ [loadChat] Response success:', response.success);
        console.log('❌ [loadChat] Response statusCode:', response.statusCode);
        console.log('❌ [loadChat] Response data:', response.data);
        console.log('❌ [loadChat] Response payload:', response.payload);
        setChat(null);
      }
    } catch (error: any) {
      console.error('💥 [loadChat] Error loading chat:', error);
      console.error('💥 [loadChat] Error details:', {
        message: error?.message,
        stack: error?.stack,
        response: error?.response?.data
      });
      setChat(null);
    } finally {
      setLoading(false);
      console.log('🔄 [loadChat] Loading finished');
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      setSending(true);
      console.log('📤 [handleSendMessage] Sending message:', newMessage);
      console.log('📤 [handleSendMessage] Current chat state:', chat);
      
      let response;
      
      if (!chat) {
        // Start new chat
        console.log('📤 [handleSendMessage] Starting new chat...');
        response = await startChat(newMessage);
      } else {
        // Send message to existing chat
        console.log('📤 [handleSendMessage] Sending message to existing chat:', chat._id);
        response = await sendUserMessage(newMessage);
      }

      console.log('📤 [handleSendMessage] API response:', response);
      console.log('📤 [handleSendMessage] Response structure:', {
        success: response.success,
        statusCode: response.statusCode,
        hasData: !!response.data,
        hasPayload: !!response.payload
      });

      // Check if the response is successful (either success: true or statusCode 200/201)
      if (response.success || response.statusCode === 200 || response.statusCode === 201) {
        const chatData = response.payload || response.data;
        console.log('✅ [handleSendMessage] Message sent successfully, updating chat:', chatData);
        console.log('✅ [handleSendMessage] New chat messages count:', chatData.messages?.length || 0);
        setChat(chatData);
        setNewMessage('');
      } else {
        console.error('❌ [handleSendMessage] Failed to send message:', response);
        alert('Failed to send message. Please try again.');
      }
    } catch (error: any) {
      console.error('💥 [handleSendMessage] Error sending message:', error);
      console.error('💥 [handleSendMessage] Error details:', {
        message: error?.message,
        response: error?.response?.data
      });
      alert('Error sending message. Please try again.');
    } finally {
      setSending(false);
      console.log('📤 [handleSendMessage] Send operation finished');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-gray-500">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading chat...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center">
        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mr-4">
          <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Chat with Support</h2>
          <p className="text-sm text-gray-500">Get help from our support team</p>
        </div>
      </div>

      {/* Debug Info */}
      <div className="bg-yellow-50 border hidden border-yellow-200 rounded-md p-3 text-sm">
        <p><strong>🔍 Debug Info:</strong></p>
        <p>User ID: {user?.id || 'None'}</p>
        <p>Chat ID: {chat?._id || 'None'}</p>
        <p>Messages Count: {chat?.messages?.length || 0}</p>
        <p>Is Resolved: {chat?.isResolved ? 'Yes' : 'No'}</p>
        <p>Loading: {loading ? 'Yes' : 'No'}</p>
        <p>Sending: {sending ? 'Yes' : 'No'}</p>
        <button 
          onClick={loadChat} 
          className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-xs"
        >
          🔄 Refresh Chat
        </button>
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Chat Header */}
        <div className="bg-blue-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">Support Team</h3>
                <p className="text-blue-100 text-sm">
                  {chat?.isResolved ? 'Chat resolved' : 'Online'}
                </p>
              </div>
            </div>
            {chat?.isResolved && (
              <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                Resolved
              </span>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {chat?.messages && chat.messages.length > 0 ? (
            chat.messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.senderRole === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.senderRole === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="text-sm font-medium mb-1">
                    {message.senderName}
                  </div>
                  <div className="text-sm">{message.message}</div>
                  <div className={`text-xs mt-1 ${
                    message.senderRole === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <p className="text-gray-500">No messages yet. Start a conversation!</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        {!chat?.isResolved && (
          <div className="border-t border-gray-200 p-4">
            <div className="flex space-x-3">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={2}
                disabled={sending}
              />
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || sending}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-md font-medium transition-colors duration-200 flex items-center"
              >
                {sending ? (
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        )}

        {chat?.isResolved && (
          <div className="border-t border-gray-200 p-4 text-center">
            <p className="text-gray-500 text-sm">This chat has been resolved. Start a new conversation if you need further assistance.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat; 