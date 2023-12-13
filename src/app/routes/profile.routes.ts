import {Routes} from "@angular/router";
import {ProfileComponent} from "../profile/profile.component";

export const USER_ROUTES: Routes = [
  { path: 'profile', component: ProfileComponent },
  {path: 'requests', loadChildren: () => import('../common-user/routes/request-routes').then(r => r.REQUESTS_ROUTES)},
  {path: 'boss', loadChildren: () => import('../dependece_boss/router/routes').then(r => r.REQUESTS_BOSS_ROUTES)},
  {path: 'service-boss', loadChildren: () => import('../service-boss/routes/routes').then(r => r.SERVICE_BOSS_ROUTES)},
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },

];
