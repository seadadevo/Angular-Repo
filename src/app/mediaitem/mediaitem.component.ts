import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WatchPipe } from '../watch.pipe';
import { SeemorePipe } from '../seemore.pipe';
import { WatchlistService } from '../services/watchlist.service';

@Component({
  selector: 'app-mediaitem',
  standalone: true,
  imports: [CommonModule, RouterLink, WatchPipe, SeemorePipe],
  templateUrl: './mediaitem.component.html',
  styleUrl: './mediaitem.component.scss'
})
export class MediaitemComponent implements OnInit{
  @Input() item:any = {} 

  isInWatchlist: boolean = false;
  constructor(private _WatchListService: WatchlistService){

  }

  ngOnInit(): void {
    this._WatchListService.isItemInWatchlist(this.item.id).subscribe(result => {
      this.isInWatchlist = result;
    })
  }
  
  addItem(item:any){
    this._WatchListService.addToWatchList(item);
  }
  removeItem(item:any){
    this._WatchListService.removeFromWatchlist(item);
  }
}
