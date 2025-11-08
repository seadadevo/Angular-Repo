import { Component, OnInit } from '@angular/core';
import { WatchlistService } from '../services/watchlist.service';
import { MediaitemComponent } from '../mediaitem/mediaitem.component';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [MediaitemComponent],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.scss'
})
export class MoviesListComponent implements OnInit {
  watchListItems: any[] = [];
  constructor(private _WatchListServices: WatchlistService){

  }

  ngOnInit(): void {
    this._WatchListServices.watchList$.subscribe((list) => {
      this.watchListItems = list
    })
  }
}
