import api from './api';
import { Message, MessageInput } from '../types/message';

export async function getMessages(): Promise<Message[]> {
  const response = await api.get('/messages');
  return response.data;
}

export async function sendMessage(data: MessageInput): Promise<Message> {
  const response = await api.post('/messages', {
    ...data,
    is_community: data.receiver_id === 'community'
  });
  return response.data;
}

export async function markMessageAsRead(id: string): Promise<Message> {
  const response = await api.patch(`/messages/${id}/read`);
  return response.data;
}