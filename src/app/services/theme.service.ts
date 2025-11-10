import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {


  private theme = new BehaviorSubject<string>(
    localStorage.getItem('theme') || 'light'
  );
  public theme$ = this.theme.asObservable();

  private defaultCursorSize = 24; 
  private cursorSize = new BehaviorSubject<number>(
    Number(localStorage.getItem('cursorSize')) || this.defaultCursorSize
  );

  private isCustomCursor = new BehaviorSubject<boolean>(
    (localStorage.getItem('customCursor') || 'false') === 'true'
  );
  public isCustomCursor$ = this.isCustomCursor.asObservable();

  public cursorSize$ = this.cursorSize.asObservable();
  
  private defaultSize = 16;
  private defaultWeight = 300;
  private fontSize = new BehaviorSubject<number>(
    Number(localStorage.getItem('fontSize')) || this.defaultSize
  );
  public fontSize$ = this.fontSize.asObservable();

  private fontWeight = new BehaviorSubject<number>(
    Number(localStorage.getItem('fontWeight')) || this.defaultWeight
  )
  public fontWeight$ = this.fontWeight.asObservable();
  
  private brandColor = new BehaviorSubject<string>(
    localStorage.getItem('brandColor') || 'blue'
  );
  public brandColor$ = this.brandColor.asObservable();

  
  private isGlowOn = new BehaviorSubject<boolean>(
    (localStorage.getItem('glow') || 'true') === 'true'
  );
  public isGlowOn$ = this.isGlowOn.asObservable();


  
  constructor() { 
    
    this.applyTheme(this.theme.getValue());
    this.applyFontSize(this.fontSize.getValue());
    this.applyFontWeight(this.fontWeight.getValue());
    this.applyBrandColor(this.brandColor.getValue());
    this.applyGlow(this.isGlowOn.getValue());
    this.applyCustomCursor(this.isCustomCursor.getValue());
    this.applyCursorSize(this.cursorSize.getValue());
  }

  
  toggleTheme() {
    const newTheme = this.theme.getValue() === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    this.theme.next(newTheme);
    this.applyTheme(newTheme);
  }
  private applyTheme(theme: string){
    if(theme === 'dark'){
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
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

  setFontWeight(weight: number) {
    localStorage.setItem('fontWeight', weight.toString());
    this.fontWeight.next(weight);
    this.applyFontWeight(weight);
  }

  private applyFontWeight(weight: number) {
    document.documentElement.style.setProperty('--font-weight', `${weight}`)
  }
  
  setBrandColor(color: string) {
    localStorage.setItem('brandColor', color);
    this.brandColor.next(color);
    this.applyBrandColor(color);
  }
  private applyBrandColor(color: string) {
   
    document.documentElement.setAttribute('data-brand-color', color);
  }

  
  setGlow(isOn: boolean) {
    localStorage.setItem('glow', isOn.toString());
    this.isGlowOn.next(isOn);
    this.applyGlow(isOn);
  }
  private applyGlow(isOn: boolean) {
    const status = isOn ? 'on' : 'off';
    
    document.documentElement.setAttribute('data-glow', status);
  }


  setCustomCursor(isOn: boolean) {
    localStorage.setItem('customCursor', isOn.toString());
    this.isCustomCursor.next(isOn);
    this.applyCustomCursor(isOn);
  }
  private applyCustomCursor(isOn: boolean) {
    const status = isOn ? 'on' : 'off';
    document.documentElement.setAttribute('data-cursor', status);
  }

  setCursorSize(size: number) {
    localStorage.setItem('cursorSize', size.toString());
    this.cursorSize.next(size);
    this.applyCursorSize(size);
  }
  private applyCursorSize(size: number) {
    document.documentElement.style.setProperty('--cursor-size', `${size}px`);
  }
  
  resetCursor() {
    this.setCustomCursor(false);
    this.setCursorSize(this.defaultCursorSize);
  }
}