import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  people: any[] = [];
  isLoading = true;

  constructor(private _MoviesService: MoviesService) {}

  ngOnInit(): void {
    this._MoviesService.getTrending('person').subscribe({
      next: (res) => {
        this.people = res.results;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching people:', err);
        this.isLoading = false;
      }
    });
  }
}
