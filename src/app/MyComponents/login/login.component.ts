import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/Shared/auth.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.email),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.auth.signIn(email, password).then(
      (user: User) => {
        console.log("Successfully logged in", user);

        this.auth.getCurrentUserId().subscribe((userId : any) => {
          console.log("The current user id is", userId);
          localStorage.setItem('userId', userId); 
        });

        this.router.navigate(['/dashboard']);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login Successful' });
      },
      (error) => {
        console.error("Login failed", error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Login Failed' });
      }
    );
  }
}
