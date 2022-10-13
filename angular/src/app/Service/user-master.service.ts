import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../Model/UserModel';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserMasterService {

  constructor(private http:HttpClient) { }
  apiUrl='http://127.0.0.1:8000/profile/users/';

  GetAllUser():Observable<UserModel[]>{
    return this.http.get<UserModel[]>(this.apiUrl);
  }

  GetUserById(UserId:any){
    return this.http.get(this.apiUrl +UserId + "/");
  }

  RemoveUser(UserId:any){
    return this.http.delete('http://127.0.0.1:8000/profile/delete/' +UserId + "/");
  }

  UpdateUser(inputdata:any){
    console.log("********")
    console.log(inputdata)
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post(this.apiUrl + 'ActivateUser/',inputdata, httpOptions);
  }

  GetAllRoles(){
    return this.http.get("http://127.0.0.1:8000/profile/users/roles/")
  }

}
