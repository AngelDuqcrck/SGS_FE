import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../shared/user.service";
import {RequestFullDTO} from "../../common-user/interfaces";
import { environmentDev } from 'src/app/environment/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class RequestBossService {

  constructor(
    private http: HttpClient,
    private user: UserService
  ) { }

  getRequests(){
    return this.http.get<RequestFullDTO[]>(`${environmentDev.url}requests/allRequestPerDependence?idDependence=`+this.user.currentUserValue.dependence.id);
  }
  rejectRequest(idRequest: number){
    return this.http.post(`${environmentDev.url}requests/reject?requestId=`+idRequest, {});
  }

  VerifyRequest(idRequest: number){
    return this.http.post(`${environmentDev.url}requests/verify?requestId=`+idRequest, {});
  }
}
