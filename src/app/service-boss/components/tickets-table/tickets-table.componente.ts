import { CommonModule, DatePipe } from "@angular/common";
import { Component, signal } from "@angular/core";
import { TableModule } from "primeng/table";
import { TicketDTO } from "../../interfaces";
import { TicketStatusPipe } from "../../pipes/ticket-status.pipe";
import { TooltipModule } from "primeng/tooltip";
import { AddEditTicketComponent } from "../add-edit-ticket/add-edit-ticket.component";
import {TicketService} from "../../service/ticket.service";
import {DialogModule} from "primeng/dialog";


@Component({
    selector: 'app-ticket-table',
    standalone: true,
    imports: [CommonModule, AddEditTicketComponent,TableModule, DatePipe, TicketStatusPipe, TooltipModule, DialogModule ],
    templateUrl: './tickets-table.componente.html',
    styles: [
    ]
})
export class TicketTableComponent {

    ticketsList = signal<TicketDTO[]>([])

    colsHeaders = signal(['Título', 'Fecha de inicio', 'Fecha de finalización', 'Empleado', 'Estado', 'Acciones'])

    openEditTicket = false

    selectedTicket: TicketDTO | null | undefined

    dialogData = signal({ title: '', description: '' })
    openDialog = false

    constructor (private ticketService: TicketService) { }

  ngOnInit(): void {
      this.ticketService.getAllTickets().subscribe((tickets) => {
          this.ticketsList.set(tickets)
      })
  }

  openEdit(ticket: TicketDTO) {
      this.openEditTicket = true
      this.selectedTicket = {...ticket}
  }

  finishTicket(id: number) {
      this.ticketService.finishTicket(id).subscribe({
        next: () => {
          this.openDialog  = true
          this.dialogData.set({ title: 'Ticket finalizado', description: 'El ticket ha sido finalizado con éxito.' })

          this.ticketService.getAllTickets().subscribe((tickets) => {
            this.ticketsList.set(tickets)

          })
        },
        error: (err) => {
          this.openDialog  = true
          this.dialogData.set({ title: 'Error', description: 'Ha ocurrido un error al finalizar el ticket. Si el problema persiste, contacte con soporte.' })
        }
      })
  }

  resetDialog() {
      this.openDialog = false
      this.dialogData.set({ title: '', description: '' })
  }

}
