import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './MyComponents/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat'
import { environment } from 'src/environments/environment';
import { RegistrationComponent } from './MyComponents/registration/registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DashboardComponent } from './MyComponents/dashboard/dashboard.component';
import { ProfileComponent } from './MyComponents/profile/profile.component';
import { NavigationComponent } from './MyComponents/navigation/navigation.component';
import { ChatComponent } from './MyComponents/chat/chat.component';

import {MatCheckboxModule} from "@angular/material/checkbox"
import {MatIconModule} from '@angular/material/icon';
import { ChatRoomSelectionComponent } from './MyComponents/chat-room-selection/chat-room-selection.component';
import { ChatListComponent } from './MyComponents/chat-list/chat-list.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    DashboardComponent,
    ProfileComponent,
    NavigationComponent,
    ChatComponent,
    ChatRoomSelectionComponent,
    ChatListComponent
  ],
  imports: [
    BrowserModule,FormsModule,MatInputModule,MatFormFieldModule,
    AppRoutingModule,ReactiveFormsModule,MatButtonModule,
    ToastModule,MatIconModule,MatCheckboxModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}, {})
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
