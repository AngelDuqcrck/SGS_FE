import {Component, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableModule} from "primeng/table";
import {TicketService} from "../../service/ticket.service";
import {RequestFullDTO} from "../../../common-user/interfaces";
import {RequestStatusPipe} from "../../pipes/request-status.pipe";
import {TooltipModule} from "primeng/tooltip";
import {AddEditTicketComponent} from "../add-edit-ticket/add-edit-ticket.component";

@Component({
  selector: 'app-request-verify-table',
  standalone: true,
  imports: [CommonModule, TableModule, RequestStatusPipe, TooltipModule, AddEditTicketComponent],
  templateUrl: './request-verify-table.component.html',
  styles: [
  ]
})
export class RequestVerifyTableComponent {

  requestsVerify = signal<RequestFullDTO[]>([])
  selectedRequestId: number |  null = -1
  openAddTicket = false
  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
    this.ticketService.getApprovedRequests().subscribe({
      next: (data) => {
        this.requestsVerify.set(data)
      }
    })
  }

  openModal(requestId: number) {
    this.selectedRequestId = requestId
    this.openAddTicket = true
  }
}
