import { CommonModule, NgStyle } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

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
 
  

}
