import { Connection } from "./connections.interface";
import { User } from "./users.interface";

export interface IonlineUsers {
  userId: number;
  socketId: string;
}

export interface ChatMessage {
  id: number;
  sender: number | User;
  chat: number | Chat;
  content: string;
  updatedAt: string;
  createdAt: string;
}

export interface Chat {
  id: number;
  messages?: {
    docs?: (number | ChatMessage)[];
    hasNextPage?: boolean;
    totalDocs?: number;
  };
  members: (number | User)[];
  updatedAt: string;
  createdAt: string;
}

export interface MyChats {
  chats: Chat[];
  connections: Connection[];
}
