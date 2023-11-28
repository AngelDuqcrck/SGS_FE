import { Routes } from "@angular/router";
import {ProfileComponent} from "../profile/profile.component";

export const USER_ROUTES: Routes = [
  { path: 'profile', component: ProfileComponent },
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },

];
