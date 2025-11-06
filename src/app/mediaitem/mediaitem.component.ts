import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WatchPipe } from '../watch.pipe';
import { SeemorePipe } from '../seemore.pipe';

@Component({
  selector: 'app-mediaitem',
  standalone: true,
  imports: [CommonModule, RouterLink, WatchPipe, SeemorePipe],
  templateUrl: './mediaitem.component.html',
  styleUrl: './mediaitem.component.scss'
})
export class MediaitemComponent {
  @Input() item:any = {} 
}
