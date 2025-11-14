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
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MediaitemComponent,
    RouterLink,
  ],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {

  languageNames: Record<string, string> = {
  en: 'English',
  ar: 'Arabic',
  fr: 'French',
  es: 'Spanish',
  de: 'German',
  it: 'Italian',
  ja: 'Japanese',
  ko: 'Korean',
  zh: 'Chinese',
  hi: 'Hindi',
  ru: 'Russian',
  pt: 'Portuguese',
  tr: 'Turkish',
  nl: 'Dutch',
  sv: 'Swedish',
  no: 'Norwegian',
  da: 'Danish',
  fi: 'Finnish',
  pl: 'Polish',
  cs: 'Czech',
  el: 'Greek',
  he: 'Hebrew'
};

  currentView: 'all' | 'movie' | 'tv' = 'all';
  isSidebarOpen = false;
  isLoading = true;

  movies: any[] = [];
  tvShows: any[] = [];

  filteredMovies: any[] = [];
  filteredTv: any[] = [];

  allShows: any[] = [];

  // search term
  term: string = '';

  generes: any[] = [];

  languageMovies: Set<string> = new Set();
  languageTV: Set<string> = new Set();
  allLanguages: Set<string> = new Set();

  selectedGenre: number | null = null;
  selectedLang: string | null = null;


  minYear: number = 1970;
  maxYear: number = new Date().getFullYear();
  selectedYear: number = 1970; 
  
  constructor(private _MoviesService: MoviesService) {}

  ngOnInit(): void {
    this.isLoading = true;

    forkJoin({
      movies: this._MoviesService.getTrending('movie'),
      tv: this._MoviesService.getTrending('tv'),
      movieGenres: this._MoviesService.getAllGeners('movie'),
      tvGenres: this._MoviesService.getAllGeners('tv'),
    }).subscribe({
      next: (res) => {
        this.movies = res.movies.results.map((m: any) => ({
          ...m,
          media_type: 'movie',
        }));
        this.tvShows = res.tv.results.map((t: any) => ({
          ...t,
          media_type: 'tv',
        }));

        const allGenres = [...res.movieGenres.genres, ...res.tvGenres.genres];
        this.generes = allGenres.filter(
          (genre, index, self) =>
            index === self.findIndex((g) => g.id === genre.id)
        );

        this.languageMovies = new Set(
          this.movies.map((m) => m.original_language ?? '')
        );
        this.languageTV = new Set(
          this.tvShows.map((t) => t.original_language ?? '')
        );
        this.allLanguages = new Set([
          ...this.languageMovies,
          ...this.languageTV,
        ]);


        const allDates = [...this.movies, ...this.tvShows]
          .map(item => item.release_date || item.first_air_date)
          .filter(Boolean);
        const validYears = allDates.map(d => new Date(d).getFullYear()).filter(y => !isNaN(y));

        if (validYears.length > 0) {
          this.minYear = Math.min(...validYears);
          this.maxYear = Math.max(...validYears);
          this.selectedYear = this.minYear; 
        }

        
        this._applyAllFilters();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading data:', err);
        this.isLoading = false;
      },
    });
  }

 
  private _applyAllFilters(): void {
    this.searchFilter();
    if (this.selectedGenre !== null) {
      this.genreFilter();
    }
    if (this.selectedLang !== null) {
      this.langFilter();
    }
    this.yearFilter();
    this.viewFilter();
  }


  searchFilter(): void {
    const q = this.term.trim().toLowerCase();
    if (!q) {
      this.filteredMovies = [...this.movies];
      this.filteredTv = [...this.tvShows];
    } else {
      this.filteredMovies = this.movies.filter((m) =>
        (m.title || m.name || '').toLowerCase().includes(q)
      );
      this.filteredTv = this.tvShows.filter((t) =>
        (t.title || t.name || '').toLowerCase().includes(q)
      );
    }
  }

  genreFilter(): void {
    this.filteredMovies = this.filteredMovies.filter(
      (m) =>
        Array.isArray(m.genre_ids) && m.genre_ids.includes(this.selectedGenre!)
    );
    this.filteredTv = this.filteredTv.filter(
      (t) =>
        Array.isArray(t.genre_ids) && t.genre_ids.includes(this.selectedGenre!)
    );
  }

  langFilter():void {
    if(this.selectedLang === null){
      return;
    }

  this.filteredMovies = this.filteredMovies.filter(
    (m) => (m.original_language || '').toLowerCase() === this.selectedLang!.toLowerCase()
  );
  this.filteredTv = this.filteredTv.filter(
    (t) => (t.original_language || '').toLowerCase() === this.selectedLang!.toLowerCase()
  );
  }


  yearFilter(): void {
    this.filteredMovies = this.filteredMovies.filter(m => {
      const itemDate = m.release_date || m.first_air_date;
      const itemYear = itemDate ? new Date(itemDate).getFullYear() : 0;
      return itemYear === 0 || itemYear >= this.selectedYear;
    });
    this.filteredTv = this.filteredTv.filter(t => {
      const itemDate = t.release_date || t.first_air_date;
      const itemYear = itemDate ? new Date(itemDate).getFullYear() : 0;
      return itemYear === 0 || itemYear >= this.selectedYear;
    });
  }


  viewFilter(): void {
    if (this.currentView === 'movie') {
      this.allShows = [...this.filteredMovies];
    } else if (this.currentView === 'tv') {
      this.allShows = [...this.filteredTv];
    } else {
      this.allShows = [...this.filteredMovies, ...this.filteredTv];
    }
  }


  onSearchChange(): void {
    this._applyAllFilters();
  }

  displayShows(mediaType: 'all' | 'movie' | 'tv') {
    this.currentView = mediaType;
    this.viewFilter();
  }

  filterByGeneres(genreID: number): void {
    this.selectedGenre = this.selectedGenre === genreID ? null : genreID;
    this._applyAllFilters();
  }

  filterByLanguage(lang: string): void {
    this.selectedLang = this.selectedLang === lang ? null : lang
    this._applyAllFilters();
  }

  onYearChange(event: any): void {
    this.selectedYear = Number(event.target.value);
    this._applyAllFilters();
  }


  showAllGenres() {
    this.selectedGenre = null;
    this._applyAllFilters();
  }
  
  showAllLangs() {
    this.selectedLang = null;
    this._applyAllFilters();
  }

  resetYear() {
    this.selectedYear = this.minYear;
    this._applyAllFilters();
  }

  get languagesList(): string[] {
    return Array.from(this.allLanguages);
  }
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  closeSidebar(): void {
    this.isSidebarOpen = false;
  }
}