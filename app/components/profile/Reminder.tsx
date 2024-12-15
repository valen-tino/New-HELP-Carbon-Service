'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export function Reminder() {
  const [userData, setUserData] = useState<{
    reminderFrequency: string;
    lastReminderDate: string | null;
  } | null>(null);

  useEffect(() => {
    // Fetch user data from the API
    async function fetchUserData() {
      try {
        const response = await fetch('/api/user/reminder');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    fetchUserData();
  }, []);

  useEffect(() => {
    if (!userData) return;

    const { reminderFrequency, lastReminderDate } = userData;
    const now = new Date();
    const lastReminder = lastReminderDate ? new Date(lastReminderDate) : null;

    let shouldShowReminder = false;

    if (reminderFrequency === 'daily') {
      shouldShowReminder = !lastReminder || now.getDate() !== lastReminder.getDate();
    } else if (reminderFrequency === 'weekly') {
      const lastReminderWeek = lastReminder
        ? Math.floor((lastReminder - new Date(lastReminder.getFullYear(), 0, 1)) / (7 * 24 * 60 * 60 * 1000))
        : -1;
      const currentWeek = Math.floor((now - new Date(now.getFullYear(), 0, 1)) / (7 * 24 * 60 * 60 * 1000));
      shouldShowReminder = !lastReminder || currentWeek !== lastReminderWeek;
    }

    if (shouldShowReminder) {
      toast.info('Don’t forget to update your activity log!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });

      // Update lastReminderDate in the backend
      fetch('/api/user/reminder', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lastReminderDate: now.toISOString() }),
      }).catch((error) => console.error('Error updating last reminder:', error));
    }
  }, [userData]);

  return <ToastContainer />;
}
