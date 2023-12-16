import {Routes} from "@angular/router";
import {UsersComponent} from "../pages/users/users.component";
import { RequestComponent } from "../pages/requests/request.component";
import {TicketsComponent} from "../pages/tickets/tickets.component";


export const SERVICE_BOSS_ROUTES: Routes = [
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'requests-boss-service',
    component: RequestComponent
  },
  {
    path: 'tickets',
    component: TicketsComponent
  },
  {
    path: '**',
    redirectTo: '/backlog/boss-service/users',
    pathMatch: 'full'
  },
]
