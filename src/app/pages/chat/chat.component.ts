import { Component, OnInit } from '@angular/core';
import { Router ,NavigationEnd} from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  Users: any[] = [];
  currentReciever: any;
  messageContent: string = "";
  showWelcomeUI:boolean=true;
  constructor(private userService: UserService,private router:Router) { }
  ngOnInit(): void {
    this.userService.retrieveUsers().subscribe((res) => {
      console.log(res);
      this.Users = res;
    })
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Check if the route has changed, and hide the welcome div if the router outlet is showing
        this.showWelcomeUI = !this.router.url.startsWith('/chat/user');
      }
    });

  }



}
