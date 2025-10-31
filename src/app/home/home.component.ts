import { CommonModule, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { ChildComponent } from '../child/child.component';
import { User } from '../models/user';
import { UsersService } from '../users.service';
import { Movie } from '../models/movie';
import { MoviesService } from '../movies.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ChildComponent, HttpClientModule, NgStyle],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers:[UsersService]
})
export class HomeComponent {

constructor(myServices:UsersService, _MoviesService: MoviesService) {
    this.homeUsers = myServices.users
    _MoviesService.getTrendingMovies().subscribe({
      next: (data) =>{
        this.tredingMovies = data.results
        console.log(this.tredingMovies)
      },
      error: (err) => this.errorMessage = err,
      complete: () => console.log('complete')
      
    })
}

homeUsers:User[] = [];
    tredingMovies: any = []
    errorMessage: string = '';
    imgPrefix: string = 'https://image.tmdb.org/t/p/w500';
    userName: string = ''
    



}
