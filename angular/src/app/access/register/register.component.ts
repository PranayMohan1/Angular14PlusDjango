import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Service/user.service';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private route:Router, private service:UserService) { }

  ngOnInit(): void {
  }
  respdata:any;

  RedirectLogin(){
    this.route.navigate(['login']);
  }

  reactiveform = new FormGroup({
    userid:new FormControl('',Validators.required),
    username:new FormControl('', Validators.required),
    password:new FormControl('', Validators.required),
    email:new FormControl('', Validators.compose([Validators.required, Validators.email]))
  });

  SaveUser(){
    console.log("Inside Save User");
    if(this.reactiveform.valid){
      console.log("Form Valid");
      this.service.Registration(this.reactiveform.value).subscribe(item => {
        this.respdata=item;
        console.log(item);
        if(this.respdata.result=="pass"){
          alertify.success("Registered Successfully. Please Contact Admin for Activation.")          
          this.RedirectLogin();
        }else{
          alertify.console.error("failed try again.");

        }
      });
    }
    console.log(this.reactiveform.value.username);

  }

}
