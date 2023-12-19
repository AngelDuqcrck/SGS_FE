import { Component, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TicketDTO } from '../service-boss/interfaces';
import { TicketService } from '../service-boss/service/ticket.service';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';

type Option = 'finish' | 'general';

type generalDialog = { title: string, message: string, option: Option };

@Component({
  selector: 'app-employee-service',
  standalone: true,
  imports: [CommonModule, TableModule, TooltipModule, DialogModule, FormsModule,DatePipe],
  templateUrl: './employee-service.component.html',
  styles: [
  ]
})
export class EmployeeServiceComponent {

  ticketsList = signal<TicketDTO[]>([]);
  selectedTicket = signal<TicketDTO | null>(null);
  observationDialog = false;
  generalDialog = false;
  generalDialogMessage = signal<generalDialog>({ title: '', message: '', option: 'general' });
  observation = ''

  constructor(
    private ticketsService: TicketService,
  ) { }

  ngOnInit(): void {
    this.ticketsService.getTicketsByEmployeeId(1).subscribe({
      next: (tickets) => {
        this.ticketsList.set(tickets);
      }
    })
  }

  triggerFinishTicket(ticket: TicketDTO) { 
    this.generalDialogMessage.set({ title: 'Finalizar ticket', message: '¿Está seguro que desea finalizar el ticket?', option: 'finish' });
    this.generalDialog = true;
    this.selectedTicket.set(ticket);
  }

  finishTicket() {
    this.generalDialog = false;
    const ticket = this.selectedTicket();
    if (ticket) {
      this.ticketsService.finishTicket(ticket.id!).subscribe({
        next: () => {
          this.generalDialog = true;
          this.generalDialogMessage.set({ title: 'Ticket finalizado', message: 'Se ha finalizado el ticket exitosamente', option: 'general' });
          this.ticketsList.update((list) => list.filter((t) => t.id !== ticket.id));
        }
      });
    }
  }

  resetGeneralDialog() {
    this.generalDialog = false;
    this.generalDialogMessage.set({ title: '', message: '', option: 'general' });
    this.selectedTicket.set(null)
    this.observation = '';
  }

  registerObservationTrigger(ticket: TicketDTO) {
    this.selectedTicket.set(ticket);
    this.observationDialog = true;
  }

  sendObservation() { 
    this.observationDialog = false;
    const ticket = this.selectedTicket();
    if (ticket) {
      this.ticketsService.registerObservation(ticket.id!, this.observation).subscribe({
        next: () => {
          this.generalDialog = true;
          this.generalDialogMessage.set({ title: 'Observación registrada', message: 'Se ha registrado la observación exitosamente', option: 'general' });
        }
      });
    }
  }
}
