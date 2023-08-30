import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Shared/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  currentUser: any = null;
  userDetails : any = null;
  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private services : UserService
  ) {}

  isMobileMenuOpen: boolean = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  ngOnInit(): void {
    this.angularFireAuth.authState.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.services.getUserDetails(user.uid).subscribe(details => {
          this.userDetails = details;
        });
      }

    });
      
  }


  logout() {
    this.angularFireAuth.signOut().then(() => {
      console.log('User logged out successfully');
      this.router.navigate(['']); // Navigate to the desired page after logout
      localStorage.clear();
    });
  }
}
