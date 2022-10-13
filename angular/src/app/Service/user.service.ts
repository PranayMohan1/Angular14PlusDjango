import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) {

   }
   ProceedLogin(inputdata: any){
    console.log(inputdata)
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post('http://127.0.0.1:8000/profile/users/login/',inputdata, httpOptions);
   }

   IsLoggedIn(){
    return localStorage.getItem('token')!=null;
   }

   GetToken(){
    return localStorage.getItem('token')!=null?localStorage.getItem('token'):'';
   }

   Registration(inputdata:any){
    console.log("In Registration service")
    const data = JSON.stringify(inputdata);
    //const headers= new HttpHeaders().set('content-type', 'application/json').set('Access-Control-Allow-Origin', '*');
    // const headerDict = {
    //   'Content-Type': 'application/json',
    //   'Accept': 'application/json',
    //   'Access-Control-Allow-Headers': 'Content-Type',
    // }
    
    // const requestOptions = {                                                                                                                                                                                 
    //   headers: new HttpHeaders(headerDict), 
    // };
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    console.log(data);
    return this.http.post('http://127.0.0.1:8000/profile/users/register/',data, httpOptions);

   }

   GetRole(){
    var token=this.GetToken();
    if(token!=null){
      //var extractdata=JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
      //return extractdata.role;
      var role = token;
      return role;
    }else{
      return '';
    }
    
   }
}
