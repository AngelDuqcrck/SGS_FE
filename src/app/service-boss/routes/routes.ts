import {Routes} from "@angular/router";
import {UsersComponent} from "../pages/users/users.component";


export const SERVICE_BOSS_ROUTES: Routes = [
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: '**',
    redirectTo: '/backlog/boss-service/users',
    pathMatch: 'full'
  },
]
