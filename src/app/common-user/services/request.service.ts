import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {RequestDTO, RequestFullDTO} from "../interfaces";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../shared/user.service";

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
    return this.http.get<RequestFullDTO>(`http://localhost:8080/requests?requestId=${this._requestSelected.value?.id}`)
  }

  getRequests() {
    return this.http.get<RequestDTO[]>(`http://localhost:8080/requests/user?userId=${this.currentUser.currentUserValue.id}`)
  }

  deleteRequest() {
    return this.http.delete(`http://localhost:8080/requests/delete?requestId=${this._requestSelected.value?.id}`)
  }

  sendRequest() {
    return this.http.post(`http://localhost:8080/requests/send?requestId=${this._requestSelected.value?.id}`, {})
  }

  createRequest(request: any) {
    return this.http.post<RequestFullDTO>(`http://localhost:8080/requests/create?userId=`+this.currentUser.currentUserValue.id, request)
  }

}
