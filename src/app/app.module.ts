import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DemoComponent } from './demo/demo.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ChatComponent } from './pages/chat/chat.component';
import { ConversationHistoryComponent } from './pages/conversation-history/conversation-history.component';
import { UserlistComponent } from './pages/userlist/userlist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestLogsComponent } from './pages/request-logs/request-logs.component';



@NgModule({
  declarations: [
    AppComponent,
    DemoComponent,
    RegisterComponent,
    LoginComponent,
    ChatComponent,
    ConversationHistoryComponent,
    UserlistComponent,
    RequestLogsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
