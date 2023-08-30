// chat.service.ts
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private db: AngularFireDatabase) {}

  getChatMessages(senderId: string, recipientId: string) {
    // Use a common path to store chat messages
    const path = `/chats/${this.generateChatId(senderId, recipientId)}`;
    return this.db.list(path).valueChanges();
  }

  sendChatMessage(senderId: string, recipientId: string, message: string) {
    const chatId = this.generateChatId(senderId, recipientId);
    const timestamp = new Date().toISOString();
    const chatMessage = {
      message,
      senderId,
      recipientId,
      timestamp
    };
    const path = `/chats/${chatId}`;
    return this.db.list(path).push(chatMessage);
  }

  private generateChatId(userId1: string, userId2: string) {
    // Generate a unique chat ID based on the two user IDs
    return userId1 < userId2 ? `${userId1}_${userId2}` : `${userId2}_${userId1}`;
  }
}
