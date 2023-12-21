import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserDTO} from "../../shared/user.service";
import {map} from "rxjs";
import {mappedFullResponse, mappedResponse} from "../../shared/map/UserDTOMapped";
import {UserFullDTO, UserServiceEmployeeDTO} from '../interfaces';
import { environmentDev } from 'src/app/environment/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers() {
    return this.http.get<UserFullDTO[]>(`${environmentDev.url}users`).pipe(
      map((res: any) => res.map(mappedFullResponse))
    );
  }

  registerUser (user: UserFullDTO) {
    const {firstName, lastName, email, password, rol, dependence} = user
    const userDTO = {
      firstName,
      lastName,
      email,
      password,
      rol: rol.role,
      rolId: rol.id,
      dependence: dependence.name,
      dependenceId: dependence.id
    }
    return this.http.post(`${environmentDev.url}users`, userDTO)
  }

  updateUser (user: UserFullDTO) {
    const {firstName, lastName, email, password, rol, dependence,id} = user
    const userDTO = {
      id,
      firstName,
      lastName,
      email,
      password,
      rol: rol.role,
      rolId: rol.id,
      dependence: dependence.name,
      dependenceId: dependence.id
    }
    return this.http.patch(`${environmentDev.url}users/update`, userDTO)
  }

  getUserServiceEmployee() {
    return this.http.get<UserServiceEmployeeDTO[]>(`${environmentDev.url}users/service-employee`)
  }

}
