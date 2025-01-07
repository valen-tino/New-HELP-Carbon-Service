import { useState, useEffect } from 'react';
import { Message } from '../types/message';
import { getMessages, sendMessage } from '../services/messageService';

export const useChatMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const data = await getMessages();
      setMessages(data);
    } catch (err) {
      setError('Failed to load messages');
      console.error('Error loading messages:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (content: string) => {
    try {
      const newMessage = await sendMessage({
        receiver_id: 'community',
        content
      });
      setMessages(prev => [...prev, newMessage]);
      return true;
    } catch (err) {
      setError('Failed to send message');
      console.error('Error sending message:', err);
      return false;
    }
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage: handleSendMessage
  };
};