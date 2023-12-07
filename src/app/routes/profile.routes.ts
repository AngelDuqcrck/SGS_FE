import { Routes } from "@angular/router";
import {ProfileComponent} from "../profile/profile.component";
import {RequestsComponent} from "../common-user/requests.component";

export const USER_ROUTES: Routes = [
  { path: 'profile', component: ProfileComponent },
  {path: 'requests', loadChildren: () => import('../common-user/routes/request-routes').then(r => r.REQUESTS_ROUTES)},
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },

];
