import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private _HttpClient: HttpClient) { 
    
  }

  getTrendingMovies():Observable<any> {
    return this._HttpClient.get('https://api.themoviedb.org/3/trending/movie/week?api_key=b374522b484f342d39e68aae5bf69b6f')
  }

}
