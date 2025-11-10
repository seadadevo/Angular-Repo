import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private _HttpClient:HttpClient) {}

  getItemDetails(mediaType:string, id: number):Observable<any> {
    return this._HttpClient.get(`https://api.themoviedb.org/3/${id}/${mediaType}?api_key=b374522b484f342d39e68aae5bf69b6f`)
  }
  getTrending(mediaType:string):Observable<any> {
    return this._HttpClient.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=b374522b484f342d39e68aae5bf69b6f`)
  }
  getSimilarMovie(mediaType:string, id:number):Observable<any> {
    return this._HttpClient.get(`https://api.themoviedb.org/3/${mediaType}/${id}/similar?api_key=b374522b484f342d39e68aae5bf69b6f&language=en-US&page=1`)
  }
  getAllGeners(mediaType:'movie' | 'tv'):Observable<any> {
    return this._HttpClient.get(`https://api.themoviedb.org/3/genre/${mediaType}/list?api_key=b374522b484f342d39e68aae5bf69b6f&language=en-US&page=1`)
  }
} 
