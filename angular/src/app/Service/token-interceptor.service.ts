import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor, OnInit{

  constructor() { }
  ngOnInit(): void {
    this.token = localStorage.getItem('token');
  }
  token = localStorage.getItem('token');
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let requestwithnewheader=req.clone({
      setHeaders:{
        Authorization:'bearer ' + this.token
      }

    })
    return next.handle(requestwithnewheader);
  }
}
