import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { CalendarModule } from 'primeng/calendar';
import { TicketDTO } from "../../interfaces";


@Component({
    selector: 'app-add-edit-ticket',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, DialogModule, DropdownModule, CalendarModule ],
    templateUrl: './add-edit-ticket.component.html',
    styles: [
        `
            .calendar-custom {
                z-index: 99999999999999999999999999 !important;
            }
        
        `
    ]
})
export class AddEditTicketComponent {

    @Input() ticket: TicketDTO | null | undefined = null;
    @Output() ticketChange: EventEmitter< TicketDTO | null | undefined > = new EventEmitter();
    visible = true;
    minDate = new Date();

    constructor(
        private fb: FormBuilder,
    ) { }

}