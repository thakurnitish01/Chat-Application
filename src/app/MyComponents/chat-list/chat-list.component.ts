import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { UserService } from 'src/app/Shared/user.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  users: any[] = [];
  selectedUserId: string = '' // Initialize to null
  senderId: any;
  recipientId: any ;
  currentUser : any;
  userId: string  = '';
  chatHistory: any[] = [];
  composedMessage: string = '';

  constructor(private userService: UserService,private db: AngularFireDatabase) {}

  ngOnInit() {
    this.userService.getCurrentUserId().subscribe(user => {
      this.currentUser = user;
      console.log('Current user:', this.currentUser);
  
      // Fetch registered users and exclude the logged-in user
      this.userService.getRegisteredUsers().subscribe(users => {
        this.users = users.filter(user => user.email !== this.currentUser?.email);
        console.log('Filtered users:', this.users);
      });
    });
  }
  
  
  
 // In the ChatListComponent
 startChatWithUser(userId: string): void {
  if (userId === this.currentUser?.uid) {
    return; // Prevent further actions for the logged-in user
  }
  this.userId = userId; // Set the userId property
  this.loadChatHistory(); // Load chat history for the selected user
}

getSelectedUserName(userId: string): string | undefined {
  const selectedUser = this.users.find(user => user.id === userId);
  return selectedUser ? selectedUser.fullName : '';
}


  selectUser(userId: string): void {
    this.selectedUserId = userId;
  }
  
  loadChatHistory() {
  
    this.userService.getChatHistory(this.userId).subscribe(history => {
      this.chatHistory = history;
    });
  }

  sendMessage() {
    if (this.composedMessage && this.userId) {
      this.userService.sendMessage(this.currentUser?.uid, this.userId, this.composedMessage);
      this.composedMessage = '';
      this.loadChatHistory(); // Reload chat history after sending a message
    }
  }
  
  }
  
  
