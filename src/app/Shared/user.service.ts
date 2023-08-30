import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'firebase/auth';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUserId: string | null = null;
  chatHistory: any[] = [];

  constructor(private afAuth: AngularFireAuth,
     private db: AngularFireDatabase,
     private firestore: AngularFirestore) {}

     setSelectedUserId(userId: string): void {
      this.selectedUserId = userId;
    }
  
    getSelectedUserId(): string | null {
      return this.selectedUserId;
    }

     
  async getAuthorizedUsers(): Promise<User[]> {
    try {
      const usersSnapshot = await this.db.list('users').snapshotChanges().toPromise();
      
      if (!usersSnapshot || usersSnapshot.length === 0) {
        return [];
      }
      
      const authorizedUsers: User[] = [];

      for (const userSnapshot of usersSnapshot) {
        const userUid = userSnapshot.key;
        const user = userSnapshot.payload.val() as User;
        
        if (userUid && user) {
          authorizedUsers.push(user);
        }
      }

      return authorizedUsers;
    } catch (error) {
      console.error('Error fetching authorized users:', error);
      return [];
    }
  }
  getCurrentUserId(): Observable<string | null> {
    return this.afAuth.authState.pipe(
      map(user => user ? user.uid : null)
    );
  }
  getRegisteredUsers(): Observable<any[]> {
    return this.firestore.collection('users').valueChanges();
  }
  getUserDetails(userId: string): Observable<any> {
    return this.firestore.collection('users').doc(userId).valueChanges();
  }

  
  sendMessage(senderId: string, recipientId: string, message: string): void {
    const chatRef = this.db.list(`chats`);
    chatRef.push({
      sender: senderId,
      recipient: recipientId,
      content: message,
      timestamp: new Date().getTime()
    });
  }
  

  getChatHistory(userId: string): Observable<any[]> {
    return this.firestore.collection('chatHistory').doc(userId).collection('messages').valueChanges();
  }
  
  
  getSelectedUserName(userId: string): Observable<string | undefined> {
    return this.firestore.collection('users').doc(userId).get().pipe(
      map(snapshot => {
        const userData = snapshot.data() as { fullName: string }; // Provide type annotation here
        return userData ? userData.fullName : undefined;
      }),
      catchError(error => {
        console.error('Error getting selected user name:', error);
        return of(undefined);
      })
    );
  }
}
