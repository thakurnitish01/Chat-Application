import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private auth: AngularFireAuth, private storage: AngularFireStorage) {}

  ngOnInit() {
    this.auth.authState.subscribe((user) => {
      this.user = user;
    });
  }

  updateProfilePicture(event: any) {
    const file = event.target.files[0];
    const filePath = `profile-pictures/${this.user.uid}`;
    const storageRef = this.storage.ref(filePath);
    storageRef.put(file).then(() => {
      // Update user's profile picture URL in Firebase
    });
  }

}
