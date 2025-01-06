import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Message } from '../../../types/message';
import { User } from '../../../types/auth';

interface Props {
  messages: Message[];
  currentUserId: string;
  currentUser: User;
}

const MessageList: React.FC<Props> = ({ messages, currentUserId, currentUser }) => {
  return (
    <div className="space-y-4">
      {messages.map((message) => {
        const isOwnMessage = message.sender_id._id === currentUserId;
        const senderName = isOwnMessage 
          ? currentUser.name 
          : (message.sender_id.name || message.sender_id.username || 'Unknown User');
        return (
          <div
            key={message._id}
            className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                isOwnMessage
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <div className="mb-1 text-xs font-medium">
                {senderName}
              </div>
              <p className="text-sm">{message.content}</p>
              <p className="mt-1 text-xs opacity-75">
                {formatDistanceToNow(new Date(message.sent_at), { addSuffix: true })}
              </p>
            </div>
          </div>
        );
      })}
      {messages.length === 0 && (
        <p className="py-4 text-center text-gray-500">
          No messages yet. Start a conversation!
        </p>
      )}
    </div>
  );
};

export default MessageList;