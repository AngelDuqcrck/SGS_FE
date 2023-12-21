import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RequestFullDTO} from "../../common-user/interfaces";
import {TicketDTO} from "../interfaces";
import { UserService } from 'src/app/shared/user.service';
import { environmentDev } from 'src/app/environment/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient, private user: UserService) { }

  getApprovedRequests() {
    return this.http.get<RequestFullDTO[]>(`${environmentDev.url}requests/approvedRequests`);
  }

  getAllTickets() {
    return this.http.get<TicketDTO[]>(`${environmentDev.url}tickets/all`);
  }

  finishTicket(id: number) {
    return this.http.post(`${environmentDev.url}tickets/finish?ticketId=${id}`, {})
  }

  updateTicket( ticket: TicketDTO) {
    return this.http.post(`${environmentDev.url}tickets/update`, ticket)
  }

  createTicket(id:number, ticket: TicketDTO) {
    return this.http.post(`${environmentDev.url}tickets/create?requestId=${id}`, ticket)
  }

  getTicketsByEmployeeId(id: number) {
    return this.http.get<TicketDTO[]>(`${environmentDev.url}tickets/employee?userId=${this.user.currentUserValue.id}`);
  }

  registerObservation(ticketId: number, observation: string) {
    return this.http.post(`${environmentDev.url}tickets/registerObservations?ticketId=${ticketId}&observation=${observation}`, {});
  }

}
