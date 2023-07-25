import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-conversation-history',
  templateUrl: './conversation-history.component.html',
  styleUrls: ['./conversation-history.component.css']
})
export class ConversationHistoryComponent implements OnInit{
  currentReciever:any;
  currentRecieverId:any;
  messageContent:string = "";
  currentUserId:number; 
  messages:any[] = [];

  constructor(private route:ActivatedRoute,private userService:UserService,private chatService:ChatService){
    this.currentRecieverId= this.route.snapshot.params['userId'];
    console.log(this.currentRecieverId)
    console.log("constructor..")

    this.currentUserId = this.userService.getLoggedInUser();
    console.log(this.currentUserId)
  
  }
  ngOnInit(): void {
    console.log("on init")
    this.currentUserId = this.userService.getLoggedInUser();

    console.log(this.currentUserId)
    this.route.params.subscribe(params=>{
      const userId = +params['userId'];
      console.log(userId);

      this.getMessages(userId);

      this.userService.retrieveUsers().subscribe((res)=>{
        this.currentReciever = res.find((user) => user.userId === userId);
      })
    })

    // this.userService.retrieveUsers().subscribe((res)=>{
    //   this.route.params.subscribe((params) => {
    //     const userId = Number(params['userId']);
    //     // Find the user with matching userId from the user list
    //     this.currentReciever = res.find((user) => user.userId === userId);
    // this.getMessages(this.currentRecieverId);

    //   });
    // })

    //this.currentUserId = this.userService.getUserId()
  }

  

  getMessages(userId:any){
    this.messages=[];
    this.chatService.getMessages(userId).subscribe((res)=>{
      console.log(res);
      this.messages=res;
    },(error)=>{
      if(error.error=='Conversation not found'){
        this.messages=[];
      }
    })
    console.log(this.messages)
  }

  sendMessage(){
    console.log(this.messageContent);
     let body={
      receiverId:this.currentReciever.userId,
      content:this.messageContent
     }
    this.chatService.sendMessage(body).subscribe((res)=>{
      this.getMessages(this.currentReciever.userId);
      this.messageContent="";
    })
  }

  onContextMenu(event: MouseEvent, message: any) {
    event.preventDefault();
    if (message.senderId === this.currentUserId) {
    message.isEvent=!message.isEvent;
    }
  }

  onAcceptEdit(message: any) {
    // Update the message content with edited content
    message.content = message.editedContent;
    message.editMode = false;
    console.log(message);
   this.chatService.editMessage(message.id,message.content).subscribe((res)=>{
    console.log(res);
   })
  }

  onDeclineEdit(message: any) {
    // Revert back to original content and close the inline editor
    message.editMode = false;
  }
  onEditMessage(message:any){
    if (message.senderId === this.currentUserId) {
      message.editMode = true;
      message.editedContent = message.content;
      message.showContextMenu = true; // Add a property to control the context menu visibility
    }
  }
  onDeleteMessage(message: any) {
    if (message.senderId === this.currentUserId) {
      message.deleteMode = true;
      message.showContextMenu = true; // Add a property to control the context menu visibility
    }
  }

  onAcceptDelete(message: any) {
    this.chatService.deleteMessage(message.id).subscribe((res)=>{
      console.log(res);
      this.getMessages(this.currentReciever.userId);

    })
  }

  onDeclineDelete(message: any) {
    // Revert back to original content and close the inline editor
    message.deleteMode = false;
  }
}
