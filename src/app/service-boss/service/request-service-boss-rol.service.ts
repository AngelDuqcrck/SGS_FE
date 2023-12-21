import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RequestFullDTO} from "../../common-user/interfaces";
import { environmentDev } from 'src/app/environment/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class RequestServiceBossRolService {

  constructor(private http: HttpClient) { }

  getVerifyRequests(){
    return this.http.get<RequestFullDTO[]>(`${environmentDev.url}requests/verifiedRequest`)
  }

  rejectRequest(idRequest: number){
    return this.http.post(`${environmentDev.url}requests/cancel?requestId=`+idRequest, {});
  }

  VerifyRequest(idRequest: number){
    return this.http.post(`${environmentDev.url}requests/approve?requestId=`+idRequest, {});
  }
}
