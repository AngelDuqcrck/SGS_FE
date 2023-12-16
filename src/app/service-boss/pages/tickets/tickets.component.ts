import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { TicketTableComponent } from '../../components/tickets-table/tickets-table.componente';
@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule, TicketTableComponent,TabViewModule],
  templateUrl: './tickets.component.html',
  styles: [
  ]
})
export class TicketsComponent {

}
