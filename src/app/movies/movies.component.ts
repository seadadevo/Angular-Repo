import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { MoviesService } from '../services/movies.service';
import { MediaitemComponent } from '../mediaitem/mediaitem.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule,FormsModule, HttpClientModule, MediaitemComponent],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: any[] = [];
  isLoading = true;
  term: string = '';
  filteredShows: any[] = [];
  constructor(private _MoviesService: MoviesService) {}
  generes: any[] = []
  filtergeneres: any[] = []
  ngOnInit(): void {
    this._MoviesService.getTrending('movie').subscribe({
      next: (res) => {
        this.movies = res.results;
         this.filteredShows = [...this.movies];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading movies:', err);
        this.isLoading = false;
      }
    });
    this._MoviesService.getAllGeners('movie').subscribe({
      next: (res) => {
        this.generes = res.genres;
        this.filtergeneres = [...this.generes]
      },
      error: (err) => {
        console.error('Error loading generes:', err);
      }
    });
  }

  searchMovise(): void {
    const termLower = this.term.toLowerCase();
    this.filteredShows = this.movies.filter((movie) =>
      movie.title.toLowerCase().includes(termLower)
    );
  }
  showAllMovies(){
    this.filteredShows = [...this.movies];
  }
  filterByGeneres(genreID:number): void {
    
    this.filteredShows = this.movies.filter((movie) =>
      movie.genre_ids.includes(genreID)
    );
  }
}
