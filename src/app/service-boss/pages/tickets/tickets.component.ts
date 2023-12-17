import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabViewModule} from 'primeng/tabview';
import {TicketTableComponent} from '../../components/tickets-table/tickets-table.componente';
import {RequestVerifyTableComponent} from "../../components/request-verify-table/request-verify-table.component";

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule, TicketTableComponent,TabViewModule, RequestVerifyTableComponent],
  templateUrl: './tickets.component.html',
  styles: [
  ]
})
export class TicketsComponent {

}
