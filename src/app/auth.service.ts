import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient, private _Router: Router) {
    if(localStorage.getItem('userToken') !== null) {
      this.saveUserData()
    }
  }

  userData:any = new BehaviorSubject(null);
  saveUserData() {
    let encodedToken = JSON.stringify(localStorage.getItem('userToken'));
    let decodedToken = jwtDecode(encodedToken);
    this.userData.next(decodedToken)
    console.log(this.userData)
  }

  signup(userData:object):Observable<any>{
    return this._HttpClient.post('http://localhost:5000/api/users/signup', userData)
  }
  
  signin(userData:object):Observable<any>{
    return this._HttpClient.post('http://localhost:5000/api/users/signin', userData)
  }

  signout() {
    localStorage.removeItem('userToken')
    this.userData.next(null);
    this._Router.navigate(['/login'])
  }
 
}
