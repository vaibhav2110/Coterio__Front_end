import { Routes } from '@angular/router';
import { SigninComponent } from '../signin/signin.component';
import { HomeComponent } from '../home/home.component';
import { ProfileComponent } from '../profile/profile.component';
import { MenuComponent } from '../menu/menu.component';
import { MeComponent } from '../me/me.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'menu', component: MenuComponent },
    { path: 'me', component: MeComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'profile/:id', component: ProfileComponent},
    { path: '', redirectTo: '/menu', pathMatch: 'full'}
];
