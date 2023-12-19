import { Routes } from "@angular/router";
import {EmployeeServiceComponent} from "../employee-service.component";


export const EMPLOYEE_SERVICE_ROUTES: Routes = [
  { path: '', component: EmployeeServiceComponent },
  {
    path: '**',
    redirectTo: '/backlog/boss',
    pathMatch: 'full'
  },

];
