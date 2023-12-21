import { CommonModule } from "@angular/common";
import {Component, EventEmitter, Input, Output, signal} from "@angular/core";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { CalendarModule } from 'primeng/calendar';
import {TicketDTO, UserServiceEmployeeDTO} from "../../interfaces";
import {UsersService} from "../../service/users.service";
import {TicketService} from "../../service/ticket.service";


@Component({
    selector: 'app-add-edit-ticket',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, DialogModule, DropdownModule, CalendarModule ],
    templateUrl: './add-edit-ticket.component.html',
    styles: [
    ]
})
export class AddEditTicketComponent {

    @Input() ticket: TicketDTO | null | undefined = null;
    @Output() ticketChange: EventEmitter< TicketDTO | null | undefined > = new EventEmitter();

    @Input({required: true}) visible = false;
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter();

    @Input() requestId: number | null = null;
    @Output() requestIdChange: EventEmitter<number | null> = new EventEmitter();
    minDate = new Date();
    finalDate = new Date();

    form = this.fb.group({
        title: ['', [Validators.required]],
        startDate: ['', [Validators.required]],
        endDate: ['',[Validators.required]],
        employeeId: [-1, [Validators.required]],
        description: ['', [Validators.required]],
    });

    usersEmployee = signal<UserServiceEmployeeDTO[]>([]);

    constructor(
        private fb: FormBuilder,
        private usersService: UsersService,
        private ticketService: TicketService,
    ) { }

  ngOnInit(): void {

      if(this.ticket){
        this.form.patchValue({
            title: this.ticket.tittle,
            startDate: new Date(this.ticket.startDate).toISOString().substring(0,10),
            endDate: new Date(this.ticket.endDate).toISOString().substring(0,10),
            employeeId: this.ticket.employeeId ? this.ticket.employeeId : -1,
            description: this.ticket.description,
        })
      }


      this.usersService.getUserServiceEmployee().subscribe((users) => {
          this.usersEmployee.set(users);
      })
  }

  cancel(){
      this.ticketChange.emit(null);
      this.visibleChange.emit(false);
      this.form.reset();
  }

  triggerDateError(control: string) {
      return (this.form.get(control)?.touched && new Date(this.form.get(control)?.value).getTime() < this.minDate.getTime());
  }
  submit(){
     // if(this.form.invalid) return
      const {title,  startDate, endDate, employeeId, description} = this.form.value;
      const ticket: TicketDTO = {
          id: this.ticket?.id ? this.ticket.id : null,
          tittle: title!,
          description:  description!,
          observation: null,
          startDate: new Date(startDate!).toISOString().substring(0,10),
          endDate:  new Date(endDate!).toISOString().substring(0,10),
          employeeId: Number(employeeId!),
          assignmentDate: null,
          statusId: null,
      }

      if(this.ticket) {
        this.ticketService.updateTicket(ticket).subscribe({
          next: () => {
            this.ticketChange.emit(ticket);
            this.visibleChange.emit(false);
            this.form.reset();
            window.location.reload();
          }
        })
        return
      }else{
        this.ticketService.createTicket(this.requestId!, ticket).subscribe({
          next: () => {
            this.ticketChange.emit(ticket);
            this.visibleChange.emit(false);
            this.form.reset();
            window.location.reload();
          }
        })
      }

  }

  onHide(){
      this.visibleChange.emit(false);
      this.form.reset();
      this.requestIdChange.emit(null);
      this.ticketChange.emit(null);
  }

}
