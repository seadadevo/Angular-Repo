import { CommonModule, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { ChildComponent } from '../child/child.component';
import { User } from '../models/user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ChildComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers:[UsersService]
})
export class HomeComponent {

constructor() {
  let myServices = new UsersService();
  this.homeUsers = myServices.users;
  myServices.welcome()
}

homeUsers:User[] = [];
  

  welcome(e: Event) {
    console.log(e)
  }

  changeToggleTheme() {
    this.toggleTheme = !this.toggleTheme
  }
  toggleTheme: boolean = false;
  userName: string = 'ahmed mohamed';
  userAge: number = 23;
  imgSrc: string = "assets/images/front.jpg";
  imgWidth: number = 150;
  lightTheme: string = "background-color: red; color: black;font-size: 20px;"
  darkTheme: string = "background-color: blue; color: white;font-size: 40px;"
  
  friends: string[] = ['ahmed', 'ali', 'khaled', 'ismail'];

  changeName() {
    this.userName = `x+${Math.random()}`
  }

}
