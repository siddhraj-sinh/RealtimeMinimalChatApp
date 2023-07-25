import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  signupForm!: FormGroup
  name='';
  email='';
  password='';

  constructor(private user:UserService,private router:Router,private formBuilder:FormBuilder){
    this.signupForm=this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], 
      password :['',Validators.required]
    });
  }
  form = {
    name:'',
    email:'',
    password:''
  }

  emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  
  registerUser(){
    console.log(this.signupForm.value);


    this.user.signup(this.signupForm.value).subscribe((res)=>{
      this.router.navigateByUrl('/login');
    })
  }

  getControl(name:any): AbstractControl | null{
    return this.signupForm.get(name);
  }
}
