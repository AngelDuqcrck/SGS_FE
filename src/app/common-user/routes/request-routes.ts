import { Routes } from "@angular/router";
import {ProfileComponent} from "../../profile/profile.component";
import {RequestInfoComponent} from "../pages/request-info/request-info.component";
import {RequestsComponent} from "../requests.component";


export const REQUESTS_ROUTES: Routes = [
  { path: '', component: RequestsComponent },
  {path: 'request-info', component: RequestInfoComponent},
  {
    path: '',
    redirectTo: 'requests',
    pathMatch: 'full'
  },

];
