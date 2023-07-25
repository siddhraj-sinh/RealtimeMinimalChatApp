import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  Users:any[]=[];
  currentReciever:any;

  constructor(private userService:UserService,private router:Router){
    
  }
  ngOnInit(): void {
    this.userService.retrieveUsers().subscribe((res)=>{
      console.log(res);
      this.Users=res;
      this.currentReciever=res[0];
    })
  }
  onUserClick(user:any) {
  //   console.log(user);
   this.currentReciever=user;
   //this.router.navigate(['/chat/user/',this.currentReciever.userId])

   this.router.navigate([{ outlets: { bookPopup: [ 'update-book' ] }}]); 
  }
}
