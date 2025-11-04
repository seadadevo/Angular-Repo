import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RegisterComponent } from './register/register.component';
import { TvComponent } from './tv/tv.component';
import { PeopleComponent } from './people/people.component';
import { MoviesComponent } from './movies/movies.component';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path:'home', canActivate: [authGuard],component: HomeComponent},
    {path:'about',canActivate: [authGuard],component: AboutComponent},
    {path:'movies',canActivate: [authGuard],component: MoviesComponent},
    {path:'tv',canActivate: [authGuard],component: TvComponent},
    {path:'people',canActivate: [authGuard],component: PeopleComponent},
    
    
    {path:'login',component: LoginComponent},
    {path:'register',component: RegisterComponent},
    
    {path:'**',component: NotfoundComponent},
];
