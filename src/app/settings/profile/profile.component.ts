import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  userData: any = null; 

  constructor(private _Router: Router,private _AuthService:AuthService){
    this._AuthService.userData.subscribe((user:any) => {
      if(user){
        this.userData = user
        console.log(this.userData)
      } else {
        this._Router.navigate(['/login'])
      }
    } )
  }


  getInitials(firstName: string, lastName: string): string {
    const first = firstName ? firstName[0] : '';
    const last = lastName ? lastName[0] : '';
    return (first + last).toUpperCase();
  }

  
  logout() {
    this._AuthService.signout();
  }

}
