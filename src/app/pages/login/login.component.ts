import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AbstractControl, FormBuilder,FormControl,FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  signinForm: FormGroup;
  email = '';
  password='';

constructor(private user:UserService,private router:Router,private formBuilder:FormBuilder ){
  this.signinForm = this.formBuilder.group({
    email : ['', [Validators.required, Validators.email]],
    password : ['', [Validators.required]]
     });

 // this.userId = userService.getCurrentUserId();
}
form = {
  email: '',
  password: ''
}
emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  signInUser() {
    console.log(this.signinForm.value);
    this.user.login(this.signinForm.value).subscribe((response) => {
      // Handle successful login
      console.log('Logged in successfully');
      console.log('Token:', response.token);
      console.log('Profile:', response.profile);
      this.user.saveToken(response.token);
      this.router.navigateByUrl('/chat');
    },
    (error) => {
      // Handle login error
      console.error('Login failed:', error.error);
    }) 
  }
  getControl(name:any):AbstractControl | null{
    return this.signinForm.get(name);
  }
}
