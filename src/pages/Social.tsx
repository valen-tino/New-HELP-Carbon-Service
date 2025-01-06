import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AchievementList from '../components/social/achievements/AchievementList';
import MessageList from '../components/social/messaging/MessageList';
import MessageInput from '../components/social/messaging/MessageInput';
import { getMessages, sendMessage } from '../services/messageService';
import { getAchievements, shareAchievement } from '../services/achievementService';
import { Achievement } from '../types/achievement';
import { Message } from '../types/message';
import { MessageCircle, Trophy } from 'lucide-react';

const Social = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [isLoadingAchievements, setIsLoadingAchievements] = useState(true);
  const [isSending, setIsSending] = useState(false);

  // Add polling interval state
  const POLLING_INTERVAL = 5000; // 5 seconds

  useEffect(() => {
    let mounted = true;
    let pollInterval: NodeJS.Timeout;

    const loadMessages = async () => {
      if (!user) return;
      
      try {
        const messagesData = await getMessages();
        if (mounted) {
          setMessages(messagesData);
        }
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    };

    const loadData = async () => {
      if (!user) return;

      setIsLoadingMessages(true);
      setIsLoadingAchievements(true);

      try {
        const [messagesData, achievementsData] = await Promise.all([
          getMessages(),
          getAchievements()
        ]);

        if (mounted) {
          setMessages(messagesData);
          setAchievements(achievementsData);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        if (mounted) {
          setIsLoadingMessages(false);
          setIsLoadingAchievements(false);
        }
      }
    };

    // Initial load
    loadData();

    // Set up polling for messages
    pollInterval = setInterval(loadMessages, POLLING_INTERVAL);

    // Cleanup function
    return () => {
      mounted = false;
      clearInterval(pollInterval);
      setMessages([]);
      setAchievements([]);
    };
  }, [user?._id]);// Depend on user ID to detect user changes

  const handleSendMessage = async (content: string) => {
    if (!user) return;
    setIsSending(true);
    try {
      // Send the message
      await sendMessage({
        receiver_id: 'community',
        content
      });
      
      // Reload all messages
      const updatedMessages = await getMessages();
      setMessages(updatedMessages);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleShareAchievement = async (achievement: Achievement) => {
    if (!user) return;
    try {
      await shareAchievement(achievement._id);
      setAchievements(prev =>
        prev.map(a =>
          a._id === achievement._id ? { ...a, shared: true } : a
        )
      );
    } catch (error) {
      console.error('Error sharing achievement:', error);
    }
  };

  if (!user) return null;

  return (
    <div className="mx-auto space-y-6 max-w-7xl">
      <h1 className="text-3xl font-bold text-gray-800">Social Room</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-800">Your Achievements</h2>
          </div>
          
          {isLoadingAchievements ? (
            <div className="py-8 text-center">
              <div className="w-8 h-8 mx-auto border-b-2 border-green-600 rounded-full animate-spin"></div>
              <p className="mt-2 text-gray-500">Loading achievements...</p>
            </div>
          ) : (
            <AchievementList
              achievements={achievements}
              onShare={handleShareAchievement}
            />
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-800">Community Chat</h2>
          </div>
          
          <div className="p-4 bg-white rounded-lg shadow-md">
            <div className="h-[400px] overflow-y-auto mb-4">
              {isLoadingMessages ? (
                <div className="py-8 text-center">
                  <div className="w-8 h-8 mx-auto border-b-2 border-green-600 rounded-full animate-spin"></div>
                  <p className="mt-2 text-gray-500">Loading messages...</p>
                </div>
              ) : (
                <MessageList
                  messages={messages}
                  currentUserId={user._id}
                  currentUser={user}
                />
              )}
            </div>
            <MessageInput
              onSend={handleSendMessage}
              isLoading={isSending}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Social;