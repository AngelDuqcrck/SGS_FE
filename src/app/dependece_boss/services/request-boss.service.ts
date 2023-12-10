import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../shared/user.service";
import {RequestFullDTO} from "../../common-user/interfaces";

@Injectable({
  providedIn: 'root'
})
export class RequestBossService {

  constructor(
    private http: HttpClient,
    private user: UserService
  ) { }

  getRequests(){
    return this.http.get<RequestFullDTO[]>('http://localhost:8080/requests/allRequestPerDependence?idDependence=1');
  }
  rejectRequest(idRequest: number){
    return this.http.post('http://localhost:8080/requests/reject?requestId='+idRequest, {});
  }

  VerifyRequest(idRequest: number){
    return this.http.post('http://localhost:8080/requests/verify?requestId='+idRequest, {});
  }

}
