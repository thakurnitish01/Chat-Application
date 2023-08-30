import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './MyComponents/login/login.component';
import { RegistrationComponent } from './MyComponents/registration/registration.component';
import { DashboardComponent } from './MyComponents/dashboard/dashboard.component';
import { ProfileComponent } from './MyComponents/profile/profile.component';
import { ChatRoomSelectionComponent } from './MyComponents/chat-room-selection/chat-room-selection.component';
import { ChatComponent } from './MyComponents/chat/chat.component';

const routes: Routes = [
  {path: '', component  : LoginComponent},
  {path: 'sign-in', component  : RegistrationComponent},
  {path: 'dashboard', component  : DashboardComponent},
  { path: 'chat-room-selection', component: ChatRoomSelectionComponent },
  { path: 'chat/:userId', component: ChatComponent },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
