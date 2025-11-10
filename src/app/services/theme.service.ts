import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private theme = new BehaviorSubject<string>(
    localStorage.getItem('theme') || 'light'
  );
  private defaultSize = 16;
  private fontSize = new BehaviorSubject<number>(
    Number(localStorage.getItem('fontSize')) || this.defaultSize
  );

  public fontSize$ = this.fontSize.asObservable();

  public theme$ = this.theme.asObservable();




  constructor() { 
    this.applyTheme(this.theme.getValue())
    this.applyFontSize(this.fontSize.getValue());
  }


  toggleTheme() {
    const newTheme = this.theme.getValue() === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    this.theme.next(newTheme)
    this.applyTheme(newTheme)
  }
  private applyTheme(theme:string){
    if(theme === 'dark'){
      document.body.classList.add('dark-theme')
    } else {
      document.body.classList.remove('dark-theme')
    }
  }


  setFontSize(size: number) {
    localStorage.setItem('fontSize', size.toString());
    this.fontSize.next(size);
    this.applyFontSize(size);
  }

  private applyFontSize(size: number) {
    document.documentElement.style.setProperty('--font-size-base', `${size}px`);
  }
}
