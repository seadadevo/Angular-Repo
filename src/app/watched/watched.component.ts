import { Component } from '@angular/core';
import { WatchedService } from '../services/watched.service';
import { MediaitemComponent } from '../mediaitem/mediaitem.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-watched',
  standalone: true,
  imports: [MediaitemComponent, RouterLink],
  templateUrl: './watched.component.html',
  styleUrl: './watched.component.scss'
})
export class WatchedComponent {
  watchedItems: any[] = [];
    constructor(private _WatchedServices: WatchedService){
  
    }
  
    ngOnInit(): void {
      this._WatchedServices.watched$.subscribe((list) => {
        this.watchedItems = list
      })
    }
}
