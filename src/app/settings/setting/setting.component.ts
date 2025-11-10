import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ThemeService } from '../../services/theme.service'; 

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.scss'
})
export class SettingComponent implements OnInit {


  currentTheme: string = 'light';
  currentFontSize: number = 16;
  currentFontWeight: number = 300;
  currentBrandColor: string = 'blue';
  isGlowOn: boolean = true;
  isCustomCursor: boolean = false;
  currentCursorSize: number = 24;

  constructor(private _ThemeService: ThemeService) {}

  ngOnInit(): void {
  
    this._ThemeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
    });

  
    this._ThemeService.fontSize$.subscribe(size => {
      this.currentFontSize = size;
    });
    
    this._ThemeService.fontWeight$.subscribe(weight => {
      this.currentFontWeight = weight;
    });
  
    this._ThemeService.brandColor$.subscribe(color => {
      this.currentBrandColor = color;
    });

  
    this._ThemeService.isGlowOn$.subscribe(isOn => {
      this.isGlowOn = isOn;
    });

    this._ThemeService.isCustomCursor$.subscribe(isOn => {
      this.isCustomCursor = isOn;
    });
    this._ThemeService.cursorSize$.subscribe(size => {
      this.currentCursorSize = size;
    });
  }



  toggleTheme() {
    this._ThemeService.toggleTheme();
  }

  onFontSizeChange(event: any) {
    const newSize = Number(event.target.value);
    this._ThemeService.setFontSize(newSize);
  }

  onFontWeightChange(event: any) {
    const newWeight = Number(event.target.value);
    this._ThemeService.setFontWeight(newWeight);
  }

  setBrandColor(color: string) {
    this._ThemeService.setBrandColor(color);
  }

  toggleGlow(event: any) {
    const isChecked = event.target.checked;
    this._ThemeService.setGlow(isChecked);
  }

  toggleCustomCursor(event: any) {
    const isChecked = event.target.checked;
    this._ThemeService.setCustomCursor(isChecked);
  }

  onCursorSizeChange(event: any) {
    const newSize = Number(event.target.value);
    this._ThemeService.setCursorSize(newSize);
  }

  resetCursor() {
    this._ThemeService.resetCursor();
  }
}