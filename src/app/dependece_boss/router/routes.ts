import { Routes } from "@angular/router";
import {RequestsComponent} from "../requests.component";


export const REQUESTS_BOSS_ROUTES: Routes = [
  { path: '', component: RequestsComponent },
  {
    path: '**',
    redirectTo: '/backlog/boss',
    pathMatch: 'full'
  },

];
