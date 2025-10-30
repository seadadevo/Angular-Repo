import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { WebComponent } from './web/web.component';
import { MobileComponent } from './mobile/mobile.component';

export const routes: Routes = [
    {path: '', redirectTo:'home', pathMatch: "full"},
    {path:'home',component: HomeComponent},
    {path:'contact',component: ContactComponent, children:[
        {path: '', component: WebComponent},
        {path: 'mobile', component: MobileComponent}
    ]},
    {path:'about',component: AboutComponent},
    {path:'**',component: NotfoundComponent},
];
