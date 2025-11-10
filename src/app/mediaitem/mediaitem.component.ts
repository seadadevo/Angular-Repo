// ملف: mediaitem.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WatchPipe } from '../watch.pipe';
import { SeemorePipe } from '../seemore.pipe';
import { WatchlistService } from '../services/watchlist.service';
import { WatchedService } from '../services/watched.service';

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
  isInWatched: boolean = false;
  
  
  private itemID_to_check: string | null = null; 
  
  constructor(private _WatchListService: WatchlistService, private _WatchedServices: WatchedService){ }

  ngOnInit(): void {
    
    if (this.item.id) {
      
      this.itemID_to_check = this.item.id.toString();
    } 
    else if (this.item.movieID) { 
     
      this.itemID_to_check = this.item.movieID.toString();
    }

   
    if (this.itemID_to_check) {
      this._WatchListService.isItemInWatchlist(this.itemID_to_check).subscribe(result => {
        this.isInWatchlist = result;
      });
      this._WatchedServices.isItemInWatched(this.itemID_to_check).subscribe(result => {
        this.isInWatched = result;
      });
    }
  }
  
  addItemToWatchList(item:any){
    this._WatchListService.addToWatchList(item);
  }
  
  removeItemFromWatchList(item:any){
    this._WatchListService.removeFromWatchlist(item);
  }
  addItemToWatched(item:any){
    this._WatchedServices.addToWatched(item);
    if(this.isInWatchlist) {
      this._WatchListService.removeFromWatchlist(item)
    }
  }
  
  removeItemFromWatched(item:any){
    this._WatchedServices.removeFromWatched(item);
  }
}