import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RegisterComponent } from './register/register.component';
import { TvComponent } from './tv/tv.component';
import { PeopleComponent } from './people/people.component';
import { MoviesComponent } from './movies/movies.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path:'home',component: HomeComponent},
    {path:'about',component: AboutComponent},
    {path:'movies',component: MoviesComponent},
    {path:'tv',component: TvComponent},
    {path:'people',component: PeopleComponent},
    
    
    {path:'login',component: LoginComponent},
    {path:'register',component: RegisterComponent},
    
    {path:'**',component: NotfoundComponent},
];
