import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/Shared/auth.service';
import { UserService } from 'src/app/Shared/user.service';

@Component({
  selector: 'app-chat-room-selection',
  templateUrl: './chat-room-selection.component.html',
  styleUrls: ['./chat-room-selection.component.css']
})
export class ChatRoomSelectionComponent implements OnInit {
  chatRoomName: string = '';
  authorizedUsers: User[] = [];
  selectedUsers: { [userId: string]: boolean } = {};
  chatRooms$: Observable<any[]> | any;
  
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private db: AngularFireDatabase
  ) {}

  ngOnInit(): void {
    this.loadAuthorizedUsers();
    this.chatRooms$ = this.db.list('chatRooms').snapshotChanges();
  }

  async loadAuthorizedUsers(): Promise<void> {
    try {
      this.authorizedUsers = await this.userService.getAuthorizedUsers();
    } catch (error) {
      console.error('Error loading authorized users:', error);
    }
  }

  toggleUserSelection(userId: string): void {
    this.selectedUsers[userId] = !this.selectedUsers[userId];
  }

  createChatRoom(): void {
    const selectedUserIds = Object.keys(this.selectedUsers)
      .filter(userId => this.selectedUsers[userId]);

    if (selectedUserIds.length === 0) {
      console.log('No users selected.');
      return;
    }

    this.authService.getCurrentUserId().subscribe(currentUser => {
      if (currentUser) {
        selectedUserIds.push(currentUser);

        const chatRoomRef = this.db.list('chatRooms').push({
          name: this.chatRoomName,
          users: selectedUserIds,
          createdAt: new Date().toISOString()
        });

        console.log('Chat room created with ID:', chatRoomRef.key);
        // You can perform further actions, like navigating to the chat room
      }
    });
  }
}
