import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { MediaitemComponent } from '../mediaitem/mediaitem.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MediaitemComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit  {
  
  constructor(private _MoviesService:MoviesService){
  }
  
  trendingMovies:any[] = [];
  trendingTv:any[] =  [];
  trendingPeople:any[] =  [];
  
  imgSrc: string = '';
  
  ngOnInit() {
    this._MoviesService.getTrending('movie').subscribe({
      next:(data)=> {
        this.trendingMovies = data.results.slice(0, 10)
        console.log(this.trendingMovies)
      }
     
    })
    this._MoviesService.getTrending('tv').subscribe({
      next:(data)=> this.trendingTv = data.results.slice(0, 10)
    })
    this._MoviesService.getTrending('person').subscribe({
      next:(data)=> this.trendingPeople = data.results.filter((item:any) => item.profile_path !== null ).slice(0, 10)
    })
  }


}

