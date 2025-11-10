import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WatchedService {

  private baseUrl = 'http://localhost:5000/api/watched';

  private watched = new BehaviorSubject<any[]>([])
  public watched$ = this.watched.asObservable()
  constructor(private _HttpClient:HttpClient, private _AuthService: AuthService) {
  
    this._AuthService.userData.subscribe((user: any) => {
      if(user){
        this.loadWatchedFromServer()
      } else {
        this.watched.next([])
      }
    } )
  }

    private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('userToken')
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
  }

    loadWatchedFromServer() {
      if(!localStorage.getItem('userToken')) {
      return;
    }

    this._HttpClient.get<any>(`${this.baseUrl}/getWatched`, {headers: this.getAuthHeaders()})
    .subscribe(response => {
      if(response && response.Watched) {
        this.watched.next(response.Watched)
      }
    })
    }

    addToWatched(item:any){
      const tmdb_id = (item.id || item.movieID)?.toString()
      const payload = {
        movieName: item.title || item.name || item.movieName, 
        imgUrl: item.imgUrl || 'https://image.tmdb.org/t/p/w500/' + item.poster_path, 
        movieID: tmdb_id
      };

      this._HttpClient.post<any>(`${this.baseUrl}/addToWatched`,payload, {headers: this.getAuthHeaders()} )
      .pipe(
        tap((response) => {
            const currentList = this.watched.getValue()
            this.watched.next([...currentList, response.Watched])
        })
      ).subscribe()

    }

    removeFromWatched(item:any){
      const movie_id_to_delete = (item.id || item.movieID)?.toString()
      if(!movie_id_to_delete) {
        console.error("Item has no ID to delete:", item);
        return;
      }

      this._HttpClient.delete<any>(`${this.baseUrl}/removeFromWatched/${movie_id_to_delete}`, {headers: this.getAuthHeaders()} )
      .pipe(
        tap(() => {
            const currentList = this.watched.getValue()
            const updatedList = currentList.filter(watchedItem => watchedItem.movieID !== movie_id_to_delete )
            this.watched.next(updatedList)
        })
      ).subscribe()

    }

    isItemInWatched(id:string):Observable<boolean> {
      return this.watched$.pipe(
        map(list => {
          return !!list.find(watchItem => watchItem.movieID == id)
        })
      )
    }


  }

