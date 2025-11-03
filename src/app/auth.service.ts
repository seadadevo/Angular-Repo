import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient) {

  }

  signup(userData:object):Observable<any>{
    return this._HttpClient.post('http://localhost:5000/api/users/signup', userData)
  }
  
  signin(userData:object):Observable<any>{
    return this._HttpClient.post('http://localhost:5000/api/users/signin', userData)
  }
 
}
