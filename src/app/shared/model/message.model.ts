import { MessageType } from "../enum/messagetype.enum";

export interface Message {
  id: number;
  type: MessageType
  fromUser?: number;
  fromUserName?: string;
  toUser?: number;
  toUserName?: string;
  message: string;
  timestamp: string;
}

export type MessageAdd = Omit<Message, 'id'>;
