import { CommonModule, DatePipe } from "@angular/common";
import { Component, signal } from "@angular/core";
import { TableModule } from "primeng/table";
import { TicketDTO } from "../../interfaces";
import { TicketStatusPipe } from "../../pipes/ticket-status.pipe";
import { TooltipModule } from "primeng/tooltip";
import { AddEditTicketComponent } from "../add-edit-ticket/add-edit-ticket.component";


@Component({
    selector: 'app-ticket-table',
    standalone: true,
    imports: [CommonModule, AddEditTicketComponent,TableModule, DatePipe, TicketStatusPipe, TooltipModule ],
    templateUrl: './tickets-table.componente.html',
    styles: [
    ]
})
export class TicketTableComponent {

    ticketsList = signal<TicketDTO[]>([
        {
            id: 1,
            title: "Sample Ticket",
            description: "This is a sample ticket for testing purposes.",
            observation: null,
            startDate: new Date("2023-12-16"),
            endDate: new Date("2023-12-16"),
            employeeId: null,
            assignmentDate:  new Date("2023-12-16"),
            statusId: null
        }
    ])

    colsHeaders = signal(['Título', 'Fecha de inicio', 'Fecha de finalización', 'Empleado', 'Estado', 'Acciones'])

    constructor () { }

}