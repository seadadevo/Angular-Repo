import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(movies: any[], term: string): any[] {
    
    if (!Array.isArray(movies)) return [];
    if (!term) return movies;

    term = term.toLowerCase();

    return movies.filter((movie) =>
      (movie.title || movie.name || '').toLowerCase().includes(term)
    );
  }

}
