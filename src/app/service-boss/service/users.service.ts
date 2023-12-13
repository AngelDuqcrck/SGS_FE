import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserDTO} from "../../shared/user.service";
import {map} from "rxjs";
import {mappedResponse} from "../../shared/map/UserDTOMapped";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers() {
    return this.http.get<UserDTO[]>('http://localhost:8080/users').pipe(
      map((res: any) => res.map(mappedResponse))
    );
  }
}
