import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mediaitem',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mediaitem.component.html',
  styleUrl: './mediaitem.component.scss'
})
export class MediaitemComponent {
  @Input() item:any = {} 
}
