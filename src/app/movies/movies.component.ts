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

        this.searchFilter();

        this.genreFilter();
        this.viewFilter();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading data:', err);
        this.isLoading = false;
      },
    });
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
    if (this.selectedGenre === null) {
      return;
    }

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
    this.searchFilter();

    if (this.selectedGenre !== null) {
      this.genreFilter();
    }
    if (this.selectedLang !== null) {
      this.langFilter();
    }

    this.viewFilter();
  }

  displayShows(mediaType: 'all' | 'movie' | 'tv') {
    this.currentView = mediaType;

    this.viewFilter();
  }

  filterByGeneres(genreID: number): void {
    this.selectedGenre = this.selectedGenre === genreID ? null : genreID;
    this.searchFilter();
    if (this.selectedGenre !== null) {
      this.genreFilter();
    }
    this.viewFilter();
  }
  filterByLanguage(lang: string): void {
    this.selectedLang = this.selectedLang === lang ? null : lang
    this.searchFilter();
    if (this.selectedGenre !== null) {
    this.genreFilter();
  }
    if (this.selectedLang !== null) {
    this.langFilter();
  }
    this.viewFilter();
  }

  showAllGenres() {
    this.selectedGenre = null;
    this.searchFilter();
    this.viewFilter();
  }
  showAllLangs() {
    this.selectedLang = null;
    this.searchFilter();
    if (this.selectedGenre !== null) {
    this.genreFilter();
  }
    this.viewFilter();
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
