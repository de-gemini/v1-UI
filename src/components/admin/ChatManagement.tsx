import React, { useState, useEffect, useRef } from 'react';
import { getAllChats, getChatById, sendAdminMessage, resolveChat } from '../../api/chat';
import { useNotificationContext } from '../../contexts/NotificationContext';

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
  createdAt: string;
}

const ChatManagement = () => {
  const { refreshNotificationCount } = useNotificationContext();
  const [chats, setChats] = useState<ChatData[]>([]);
  const [selectedChat, setSelectedChat] = useState<ChatData | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'resolved'>('pending');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    loadChats();
  }, [filter]);

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat?.messages]);

  const loadChats = async () => {
    try {
      setLoading(true);
      console.log('🔄 [Admin] Loading chats with filter:', filter);
      
      const response = await getAllChats();
      
      console.log('🔄 [Admin] Chats response:', response);
      
      if (response.success || response.statusCode === 200) {
        const allChats = response.payload || response.data;
        console.log('✅ [Admin] Setting chats:', allChats.length, 'chats');
        setChats(allChats);
        // Refresh notification count to keep it in sync
        refreshNotificationCount();
      } else {
        console.log('❌ [Admin] Failed to load chats:', response);
      }
    } catch (error) {
      console.error('💥 [Admin] Error loading chats:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate counts from full dataset
  const allChatsCount = chats.length;
  const pendingChatsCount = chats.filter(chat => !chat.isResolved).length;
  const resolvedChatsCount = chats.filter(chat => chat.isResolved).length;

  // Filter chats based on current filter
  const filteredChats = chats.filter(chat => {
    if (filter === 'pending') return !chat.isResolved;
    if (filter === 'resolved') return chat.isResolved;
    return true; // 'all'
  });

  const selectChat = async (chatId: string) => {
    try {
      const response = await getChatById(chatId);
      if (response.success || response.statusCode === 200) {
        setSelectedChat(response.payload || response.data);
      }
    } catch (error) {
      console.error('Error loading chat:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return;

    try {
      setSending(true);
      console.log('📤 [Admin] Sending message to chat:', selectedChat._id, 'Message:', newMessage);
      
      const response = await sendAdminMessage(selectedChat._id, newMessage);
      console.log('📤 [Admin] Send response:', response);
      
      if (response.success || response.statusCode === 200) {
        console.log('✅ [Admin] Message sent successfully');
        setSelectedChat(response.payload || response.data);
        setNewMessage('');
        // Refresh chat list to update last message time
        loadChats();
        // Refresh notification count in case it affects unresolved chat count
        refreshNotificationCount();
      } else {
        console.log('❌ [Admin] Failed to send message:', response);
      }
    } catch (error) {
      console.error('💥 [Admin] Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  const handleResolveChat = async () => {
    if (!selectedChat) return;

    try {
      const response = await resolveChat(selectedChat._id);
      if (response.success || response.statusCode === 200) {
        setSelectedChat(response.payload || response.data);
        loadChats();
        // Refresh notification count when chat is resolved
        refreshNotificationCount();
      }
    } catch (error) {
      console.error('Error resolving chat:', error);
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

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const getLastMessage = (chat: ChatData) => {
    if (chat.messages.length === 0) return 'No messages';
    const lastMessage = chat.messages[chat.messages.length - 1];
    return lastMessage.message.length > 50 
      ? lastMessage.message.substring(0, 50) + '...' 
      : lastMessage.message;
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-gray-500">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading chats...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-6 items-center justify-between">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Chat Management</h2>
            <p className="text-sm text-gray-500">Manage customer support chats</p>
          </div>
        </div>
        
        {/* Filter Tabs */}
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-md text-xs font-medium transition-colors duration-200 ${
              filter === 'pending'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Pending ({pendingChatsCount})
          </button>
          <button
            onClick={() => setFilter('resolved')}
            className={`px-4 py-2 rounded-md text-xs font-medium transition-colors duration-200 ${
              filter === 'resolved'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Resolved ({resolvedChatsCount})
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              filter === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All ({allChatsCount})
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Chats</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {filteredChats.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No chats found
                </div>
              ) : (
                filteredChats.map((chat) => (
                  <div
                    key={chat._id}
                    onClick={() => selectChat(chat._id)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${
                      selectedChat?._id === chat._id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-gray-900">{chat.userName}</div>
                      <div className="flex items-center space-x-2">
                        {!chat.isResolved && (
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        )}
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          chat.isResolved 
                            ? 'bg-gray-100 text-gray-600' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {chat.isResolved ? 'Resolved' : 'Active'}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mb-1">{chat.userEmail}</div>
                    <div className="text-sm text-gray-500 mb-2">{getLastMessage(chat)}</div>
                    <div className="text-xs text-gray-400">
                      {formatDate(chat.lastMessageAt)} at {formatTime(chat.lastMessageAt)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="lg:col-span-2">
          {selectedChat ? (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white text-sm font-semibold">{selectedChat.userName}</h3>
                      <p className="text-blue-100 text-[10px]">{selectedChat.userEmail}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!selectedChat.isResolved && (
                      <button
                        onClick={handleResolveChat}
                        className="bg-green-500 hover:bg-green-600 mr-2 text-white px-3 py-1 rounded-md text-[10px] font-medium transition-colors duration-200"
                      >
                        Mark as resolved?
                      </button>
                    )}
                    <span className={`text-white px-2  py-1 rounded-full text-xs font-medium ${
                      selectedChat.isResolved ? 'bg-green-500' : ''
                    }`}>
                      {selectedChat.isResolved ? 'Resolved' : ''}
                    </span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {selectedChat.messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.senderRole === 'admin' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.senderRole === 'admin'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <div className="text-sm font-medium mb-1">
                        {message.senderName}
                      </div>
                      <div className="text-sm">{message.message}</div>
                      <div className={`text-xs mt-1 ${
                        message.senderRole === 'admin' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              {!selectedChat.isResolved && (
                <div className="border-t border-gray-200 p-4">
                  <div className="flex space-x-3">
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your response..."
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

              {selectedChat.isResolved && (
                <div className="border-t border-gray-200 p-4 text-center">
                  <p className="text-gray-500 text-sm">This chat has been resolved.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a chat</h3>
              <p className="text-gray-500">Choose a chat from the list to start responding to customer messages.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatManagement; 