import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MoviesService } from '../services/movies.service';
import { MediaitemComponent } from '../mediaitem/mediaitem.component';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs'; 
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, MediaitemComponent, RouterLink],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  currentView: 'all' | 'movie' | 'tv' = 'all';
  
  
  movies: any[] = [];
  tvShows: any[] = [];
  
  isSidebarOpen = false;

  isLoading = true;
  term: string = '';
  
  
  filteredMovies: any[] = [];
  filteredTv: any[] = [];
  allShows: any[] = []; 
  
  generes: any[] = [];

  languageMovies: Set<string> = new Set();
  languageTV: Set<string> = new Set();
  allLanguages: Set<string> = new Set();
  constructor(private _MoviesService: MoviesService) {}

  ngOnInit(): void {
    this.isLoading = true;

    forkJoin({
      movies: this._MoviesService.getTrending('movie'),
      tv: this._MoviesService.getTrending('tv'),
      movieGenres: this._MoviesService.getAllGeners('movie'),
      tvGenres: this._MoviesService.getAllGeners('tv')
    }).subscribe({
      next: (res) => {
        this.movies = res.movies.results;
        this.tvShows = res.tv.results;
        const allGenres = [...res.movieGenres.genres, ...res.tvGenres.genres];
        this.generes = allGenres.filter((genre, index, self) =>
          index === self.findIndex((g) => g.id === genre.id)
        );
        this.languageMovies = new Set(this.movies.map(m => m.original_language ?? '' ));
        this.languageTV = new Set(this.tvShows.map(t => t.original_language ?? '' ));
        this.allLanguages = new Set([...this.languageMovies , ...this.languageTV])

        this.applyAllFilters();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading data:', err);
        this.isLoading = false;
      }
    });
  }


  applyAllFilters(genreID: number | null = null) {
    const q = this.term.trim().toLowerCase();

   
    this.filteredMovies = this.movies.filter(m => (m.title || m.name || '').toLowerCase().includes(q));
    this.filteredTv = this.tvShows.filter(t => (t.title || t.name || '').toLowerCase().includes(q));

   
    if (genreID !== null) {
      this.filteredMovies = this.filteredMovies.filter(m => m.genre_ids.includes(genreID));
      this.filteredTv = this.filteredTv.filter(t => t.genre_ids.includes(genreID));
    }

    if (this.currentView === 'movie') {
      this.allShows = [...this.filteredMovies];
    } else if (this.currentView === 'tv') {
      this.allShows = [...this.filteredTv];
    } else {
      this.allShows = [...this.filteredMovies, ...this.filteredTv];
    }
  }

  
  onSearchChange(): void {
    this.applyAllFilters();
  }

 
  displayShows(mediaType: 'all' | 'movie' | 'tv') {
    this.currentView = mediaType;
    
    this.applyAllFilters(); 
  }

  
  filterByGeneres(genreID: number): void {
    this.applyAllFilters(genreID);
  }

  
  showAllGenres() {
    this.applyAllFilters(null); 
  }

  toggleSidebar(){ this.isSidebarOpen = !this.isSidebarOpen; }
closeSidebar(){ this.isSidebarOpen = false; }
}