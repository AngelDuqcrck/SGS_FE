import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RequestDTO, RequestFullDTO} from "../../common-user/interfaces";
import {TicketDTO} from "../interfaces";
import { UserService } from 'src/app/shared/user.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient, private user: UserService) { }

  getApprovedRequests() {
    return this.http.get<RequestFullDTO[]>('http://localhost:8080/requests/approvedRequests');
  }

  getAllTickets() {
    return this.http.get<TicketDTO[]>('http://localhost:8080/tickets/all');
  }

  finishTicket(id: number) {
    return this.http.post(`http://localhost:8080/tickets/finish?ticketId=${id}`, {})
  }

  updateTicket( ticket: TicketDTO) {
    return this.http.post(`http://localhost:8080/tickets/update`, ticket)
  }

  createTicket(id:number, ticket: TicketDTO) {
    return this.http.post(`http://localhost:8080/tickets/create?requestId=${id}`, ticket)
  }

  getTicketsByEmployeeId(id: number) {
    return this.http.get<TicketDTO[]>(`http://localhost:8080/tickets/employee?userId=${this.user.currentUserValue.id}`);
  }

  registerObservation(ticketId: number, observation: string) {
    return this.http.post(`http://localhost:8080/tickets/registerObservations?ticketId=${ticketId}&observation=${observation}`, {});
  }

}
