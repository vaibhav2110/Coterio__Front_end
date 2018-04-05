import { Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { ProfileComponent } from '../profile/profile.component';
import { MenuComponent } from '../menu/menu.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'menu', component: MenuComponent },
    { path: 'profile/:id', component: ProfileComponent},
    { path: '', redirectTo: '/menu', pathMatch: 'full'}
];
