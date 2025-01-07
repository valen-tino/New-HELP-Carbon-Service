// In src/types/message.ts
export interface Message {
  _id: string;
  sender_id: {
    _id: string;
    name: string;
    username: string;
  };
  receiver_id?: {
    _id: string;
    name: string;
    username: string;
  };
  content: string;
  is_community?: boolean;
  sent_at: string;
  read_at: string | null;
  status: 'sent' | 'delivered' | 'read';
}

export interface MessageInput {
  receiver_id: string;
  content: string;
}
