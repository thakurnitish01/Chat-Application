import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  userId: string | any;
  messages$: Observable<any[]> | any;
  newMessage: string | any;
  selectedUserId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.selectedUserId = paramMap.get('userId');
      this.loadMessages();
    });
  }

  loadMessages(): void {
    if (this.selectedUserId) {
      this.messages$ = this.db.list(`chatRooms/${this.selectedUserId}/messages`).valueChanges();
    }
  }

  sendMessage(): void {
    if (this.newMessage.trim() !== '' && this.selectedUserId) {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.db.list(`chatRooms/${this.selectedUserId}/messages`).push({
            content: this.newMessage,
            userId: user.uid,
            timestamp: new Date().toISOString()
          });
          this.newMessage = '';
        }
      });
    }
  }
}