import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ICourse } from './app.component.model';

import { PagesComponent } from './pages/pages.component';


@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        PagesComponent,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  data = {
    title: 'angular-complete-guide',
  };

}
