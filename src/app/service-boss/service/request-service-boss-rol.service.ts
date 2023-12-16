import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RequestFullDTO} from "../../common-user/interfaces";

@Injectable({
  providedIn: 'root'
})
export class RequestServiceBossRolService {

  constructor(private http: HttpClient) { }

  getVerifyRequests(){
    return this.http.get<RequestFullDTO[]>('http://localhost:8080/requests/verifiedRequest')
  }

  rejectRequest(idRequest: number){
    return this.http.post('http://localhost:8080/requests/cancel?requestId='+idRequest, {});
  }

  VerifyRequest(idRequest: number){
    return this.http.post('http://localhost:8080/requests/approve?requestId='+idRequest, {});
  }
}
