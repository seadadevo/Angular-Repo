import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: any[] = [];
  isLoading = true;

  constructor(private _MoviesService: MoviesService) {}

  ngOnInit(): void {
    this._MoviesService.getTrending('movie').subscribe({
      next: (res) => {
        this.movies = res.results;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading movies:', err);
        this.isLoading = false;
      }
    });
  }
}
