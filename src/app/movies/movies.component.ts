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
  }

  searchMovise(): void {
    const termLower = this.term.toLowerCase();
    this.filteredShows = this.movies.filter((movie) =>
      movie.title.toLowerCase().includes(termLower)
    );
  }
}
