import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  currentTheme: string = 'light';
  currentFontSize: number = 16;
  constructor(private _AuthService:AuthService, private _ThemeService: ThemeService) {

  } 

  ngOnInit(): void {
    this._AuthService.userData.subscribe({
      next:() => {
        if(this._AuthService.userData.getValue() != null) {
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }
      }
    })

    this._ThemeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
    })

    this._ThemeService.fontSize$.subscribe(size => {
      this.currentFontSize = size;
    });
  }

  logOut() {
    this._AuthService.signout()
  }

  toggleTheme() {
    this._ThemeService.toggleTheme();
  }

  onFontSizeChange(event: any) {
    const newSize = Number(event.target.value);
    this._ThemeService.setFontSize(newSize);
  }

}
