import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {RequestDTO, RequestFullDTO} from "../interfaces";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../shared/user.service";
import { environmentDev } from 'src/app/environment/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private _requestSelected = new BehaviorSubject<RequestDTO | null >(null);

  constructor(private http: HttpClient, private currentUser: UserService) { }

  get requestSelected(): Observable<RequestDTO | null> {
    return this._requestSelected.asObservable();
  }

  get requestSelectedValue(): RequestDTO | null {
    return this._requestSelected.value;
  }

  set requestSelected(request: RequestDTO | null) {
    this._requestSelected.next(request);
  }

  getlookRequestDetails() {
    return this.http.get<RequestFullDTO>(`${environmentDev.url}requests?requestId=${this._requestSelected.value?.id}`)
  }

  getRequests() {
    return this.http.get<RequestDTO[]>(`${environmentDev.url}requests/user?userId=${this.currentUser.currentUserValue.id}`)
  }

  deleteRequest() {
    return this.http.delete(`${environmentDev.url}requests/delete?requestId=${this._requestSelected.value?.id}`)
  }

  sendRequest() {
    return this.http.post(`${environmentDev.url}requests/send?requestId=${this._requestSelected.value?.id}`, {})
  }

  createRequest(request: any) {
    return this.http.post<RequestFullDTO>(`${environmentDev.url}requests/create?userId=`+this.currentUser.currentUserValue.id, request)
  }

}
