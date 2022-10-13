import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/Material-Module';
import {FormsModule} from '@angular/forms'
import { UserService } from '../Service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service:UserService, private route: Router) { }

  ngOnInit(): void {
    localStorage.clear();
  }
  respdata:any;
  ProceedLogin(logindata: any){
    if(logindata.valid){
      this.service.ProceedLogin(logindata.value).subscribe(item=>{
        this.respdata=item
        //this.respdata = {jwtToken: "jwojdowjdoiwd", refreshToken: "kjahdkjdj"}
        console.log(this.respdata)
        if(this.respdata!=null){
          //Local Storage to get state
          localStorage.setItem('token', this.respdata.jwtToken);
          
          this.route.navigate(['home']);
        }else{
          alert("Login Failed");
          this.route.navigate(['login']);
        }
        console.log(this.respdata);
      });
    }
  }

  RedirectRegister(){
    this.route.navigate(['access/register']);
  }

}
