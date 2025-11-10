import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  private baseUrl = 'http://localhost:5000/api/favorites';


  private watchList = new BehaviorSubject<any[]>([]);

  public watchList$ = this.watchList.asObservable();

  constructor(
    private _HttpClient: HttpClient,
    private _AuthService: AuthService
  ) {
   
    this._AuthService.userData.subscribe((user:any) => {
      if (user) {
       
        this.loadFavoritesFromServer();
      } else {
      
        this.watchList.next([]);
      }
    });
  }


  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('userToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }


  loadFavoritesFromServer() {
    if (!localStorage.getItem('userToken')) {
      return; 
    }

    this._HttpClient.get<any>(`${this.baseUrl}/getFavorites`, { headers: this.getAuthHeaders() })
      .subscribe(response => {
       
        if (response && response.Favorites) {

          this.watchList.next(response.Favorites);
        }
      });
  }

  addToWatchList(item: any) {
    
    const payload = {
      movieName: item.title || item.name, 
      imgUrl: 'https://image.tmdb.org/t/p/w500/' + item.poster_path, 
      movieID: item.id.toString() 
    };

    
    this._HttpClient.post<any>(`${this.baseUrl}/addToFavorites`, payload, { headers: this.getAuthHeaders() })
      .pipe(
        tap((response) => {
          
          const currentList = this.watchList.getValue();
          this.watchList.next([...currentList, response.Favorite]);
        })
      )
      .subscribe();
  }

  removeFromWatchlist(item: any) {
    
    const movie_id_to_delete = (item.id || item.movieID)?.toString();

    if (!movie_id_to_delete) {
      console.error("Item has no ID to delete:", item);
      return;
    }

   
    this._HttpClient.delete(`${this.baseUrl}/removeFromFavorites/${movie_id_to_delete}`, { headers: this.getAuthHeaders() })
      .pipe(
        tap(() => {
          const currentList = this.watchList.getValue();
          const updatedList = currentList.filter(favItem => favItem.movieID !== movie_id_to_delete);
          this.watchList.next(updatedList);
        })
      )
      .subscribe();
  }


  isItemInWatchlist(id: string): Observable<boolean> {
    
    return this.watchList$.pipe(
      map(list => {
        return !!list.find(favItem => favItem.movieID === id);
      })
    );
  }
}