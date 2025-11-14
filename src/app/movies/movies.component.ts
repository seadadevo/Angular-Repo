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
  
  paginatedShows: any[] = [];

  term: string = '';
  generes: any[] = [];
  allLanguages: Set<string> = new Set();
  selectedGenre: number | null = null;
  selectedLang: string | null = null;
  minYear: number = 1970;
  maxYear: number = new Date().getFullYear();
  selectedYear: number = 1970;

  
  currentPage: number = 1;
  itemsPerPage: number = 8; 
  
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

        
        this.allLanguages = new Set([
          ...this.movies.map((m) => m.original_language ?? ''),
          ...this.tvShows.map((t) => t.original_language ?? '')
        ].filter(Boolean));

        
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

    this.currentPage = 1;
    this.updatePaginatedView();
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
    this.currentPage = 1; 
    this.updatePaginatedView(); 
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


  
  updatePaginatedView(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedShows = this.allShows.slice(startIndex, endIndex);
  }


  getTotalPages(): number {
    return Math.ceil(this.allShows.length / this.itemsPerPage);
  }

 
  getPageNumbers(): number[] {
    const totalPages = this.getTotalPages();
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.getTotalPages()) {
      return;
    }
    this.currentPage = page;
    this.updatePaginatedView();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


  nextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
      this.updatePaginatedView();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedView();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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