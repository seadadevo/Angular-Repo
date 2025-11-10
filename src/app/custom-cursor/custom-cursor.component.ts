import { Component, HostListener, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-custom-cursor',
  standalone: true,
  template: `<div class="custom-cursor"></div>`, 
  styleUrl: './custom-cursor.component.scss'
})
export class CustomCursorComponent {
  private cursor: HTMLElement | null = null;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
   
    this.cursor = this.el.nativeElement.querySelector('.custom-cursor');
  }

  
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.cursor) {
     
      this.cursor.style.left = event.clientX + 'px';
      this.cursor.style.top = event.clientY + 'px';
    }
  }
}