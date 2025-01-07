import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import MessageList from '../messaging/MessageList';
import MessageInput from '../messaging/MessageInput';
import { useChatMessages } from '../../../hooks/useChatMessages';

const CommunityChat = () => {
  const { user } = useAuth();
  const { messages, isLoading, sendMessage } = useChatMessages();

  if (!user) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MessageCircle className="h-6 w-6 text-green-600" />
        <h2 className="text-xl font-semibold text-gray-800">Community Chat</h2>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="h-[500px] flex flex-col">
          <div className="flex-1 overflow-y-auto mb-4">
            <MessageList
              messages={messages}
              currentUserId={user._id}
              currentUser={user}
              isLoading={isLoading}
            />
          </div>
          <MessageInput onSend={sendMessage} />
        </div>
      </div>
    </div>
  );
};

export default CommunityChat;