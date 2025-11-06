import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mediaitem',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mediaitem.component.html',
  styleUrl: './mediaitem.component.scss'
})
export class MediaitemComponent {
  @Input() item:any = {} 
}
