import { Pipe, PipeTransform } from '@angular/core';
import {TICKETS_STATUS} from "../const/";

@Pipe({
  name: 'ticketStatus',
  standalone: true
})
export class TicketStatusPipe implements PipeTransform {

  transform(value: number): unknown {
    return TICKETS_STATUS[value-1] || 'Desconocido';
  }

}
