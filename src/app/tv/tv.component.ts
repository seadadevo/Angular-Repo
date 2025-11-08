import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MoviesService } from '../services/movies.service';
import { MediaitemComponent } from '../mediaitem/mediaitem.component';

@Component({
  selector: 'app-tv',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, MediaitemComponent],
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss']
})
export class TvComponent implements OnInit {
  tvShows: any[] = [];
  filteredShows: any[] = [];
  isLoading = true;
  term: string = '';

  constructor(private _MoviesService: MoviesService) {}

  ngOnInit(): void {
    this._MoviesService.getTrending('tv').subscribe({
      next: (res) => {
        this.tvShows = res.results;
        this.filteredShows = [...this.tvShows];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching TV shows:', err);
        this.isLoading = false;
      }
    });
  }

  searchTV(): void {
    const termLower = this.term.toLowerCase();
    this.filteredShows = this.tvShows.filter((tv) =>
      tv.name.toLowerCase().includes(termLower)
    );
  }
}
