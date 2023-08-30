import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'] 
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  passwordMismatch: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });

    // this.registrationForm.get('confirmPassword').valueChanges.subscribe(() => {
    //   this.passwordMismatch = this.registrationForm.get('password').value !== this.registrationForm.get('confirmPassword').value;
    // });
  }

  async register() {
    if (this.registrationForm.valid && !this.passwordMismatch) {
      const fullName = this.registrationForm.value.fullName;
      const email = this.registrationForm.value.email;
      const password = this.registrationForm.value.password;
      const mobileNumber = this.registrationForm.value.mobileNumber;

      try {
        const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
        console.log('User registered successfully!', userCredential);

        if (userCredential.user) {
          const userId = userCredential.user.uid; // Get the user's ID
          
          // Store user data in Firestore with the user's ID as document ID
          await this.firestore.collection('users').doc(userId).set({
            fullName: fullName,
            email: email,
            mobileNumber: mobileNumber
          });

          // Redirect or show success message
          this.router.navigate(['']);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registration Successful' });
        }
      } catch (error) {
        console.error('User registration failed', error);
        // Show error message
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Registration Failed' });
      }
    }
  }
}
