import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../services/movies.service';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-moviedetails',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './moviedetails.component.html',
  styleUrl: './moviedetails.component.scss'
})
export class MoviedetailsComponent implements OnInit {
  constructor(private _ActivatedRoute: ActivatedRoute, private _MoviesService:MoviesService) {
  }

  itemDetails:any = []

  ngOnInit(): void {
    let {id , media_type} = this._ActivatedRoute.snapshot.params;
    console.log(id , media_type)
    this._MoviesService.getItemDetails(id, media_type).subscribe({
      next:(data)=> this.itemDetails = data
    })
  }

}
