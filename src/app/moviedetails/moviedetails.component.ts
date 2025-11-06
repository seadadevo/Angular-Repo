import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MoviesService } from '../services/movies.service';
import { CommonModule, NgClass } from '@angular/common';
import { MediaitemComponent } from '../mediaitem/mediaitem.component';
import { SeemorePipe } from '../seemore.pipe';

@Component({
  selector: 'app-moviedetails',
  standalone: true,
  imports: [CommonModule, NgClass, MediaitemComponent, RouterLink, SeemorePipe],
  templateUrl: './moviedetails.component.html',
  styleUrl: './moviedetails.component.scss'
})
export class MoviedetailsComponent implements OnInit {
  constructor(private _ActivatedRoute: ActivatedRoute, private _MoviesService:MoviesService) {
  }
  mediaType: string = '';
  itemDetails:any = []
  similarMovies:any = []

  ngOnInit(): void {
    let {id , media_type} = this._ActivatedRoute.snapshot.params;
    this.mediaType = media_type;
    this._MoviesService.getItemDetails(id, media_type).subscribe({
      next:(data)=>{
        this.itemDetails = data
        console.log(this.itemDetails)
      } 
      
    })
    this._MoviesService.getSimilarMovie(media_type, id).subscribe({
      next:(data)=> {
        this.similarMovies = data.results.slice(0, 20)
      }
    })
  }

getSimilar(mediaType: any, id: any) {
  this._MoviesService.getSimilarMovie(mediaType, id).subscribe({
    next: (data) => {
      this.similarMovies = data.results.slice(0, 20);
    }
  });

 this._MoviesService.getItemDetails( id, mediaType).subscribe({
  next: (data) => {
    this.itemDetails = data
    console.log(this.itemDetails);
  }
});
}


}
