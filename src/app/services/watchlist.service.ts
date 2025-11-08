import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private watchList = new BehaviorSubject<any[]>([]);
  watchList$ = this.watchList.asObservable();

  constructor() { 
    const savedList = localStorage.getItem('watchList');
    if(savedList) {
      const parsedList = JSON.parse(savedList);
      this.watchList.next(parsedList);
    }
  }

  addToWatchList(item:any){
    const currentList = this.watchList.getValue()
    const itemExists = currentList.find(i => i.id === item.id )
    if(!itemExists) {
      const updatedList = [...currentList, item]
      this.watchList.next(updatedList)
      localStorage.setItem("watchList", JSON.stringify(updatedList))
    } else {
      console.log('item is aleady exist!', item)

    }
  }


  removeFromWatchlist(item:any) {
    const currentList = this.watchList.getValue()
    const updatedList = currentList.filter(i => i.id !== item.id)
    this.watchList.next(updatedList)
    localStorage.setItem("watchList", JSON.stringify(updatedList))
  }


  isItemInWatchlist(id: number): Observable<boolean> {
    return this.watchList$.pipe(
      map(list => {
        return !!list.find(i => i.id === id); 
      })
    );
  }
}
