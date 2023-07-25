import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ChatComponent } from './pages/chat/chat.component';
import { ConversationHistoryComponent } from './pages/conversation-history/conversation-history.component';
import { RequestLogsComponent } from './pages/request-logs/request-logs.component';
import { authGuard } from './services/auth.guard';

const routes: Routes = [

  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'chat',component:ChatComponent, children: [
    { path: 'user/:userId', component: ConversationHistoryComponent },
  ],canActivate:[authGuard]},
  {path:'logs',component:RequestLogsComponent},
  {path:'',redirectTo:'/register',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
