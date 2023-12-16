import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { RequestFullDTO } from 'src/app/common-user/interfaces';
import { RequestBossService } from 'src/app/dependece_boss/services/request-boss.service';
import {TooltipModule} from "primeng/tooltip";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {RequestViewComponent} from "../../../ui/request-view/request-view.component";
import {RequestStatusPipe} from "../../pipes/request-status.pipe";
import {RequestServiceBossRolService} from "../../service/request-service-boss-rol.service";

@Component({
  selector: 'app-request-boss-service',
  standalone: true,
  imports: [CommonModule, RequestViewComponent, TableModule, DialogModule, TooltipModule, FormsModule, InputTextModule, ReactiveFormsModule, RequestStatusPipe],
  templateUrl: './request.component.html',
  styles: [],
})
export class RequestComponent {
  requestList = signal<RequestFullDTO[]>([]);

  dataModal  = signal({title: '', message: ''})
  verifiyModal = false;

  dataConfirmDialog = signal({title: '', message: ''});
  confirmDialog = false;

  selectedRequest: RequestFullDTO | null | undefined;

  constructor(private requestService: RequestServiceBossRolService) {}

  ngOnInit(): void {
    this.requestService.getVerifyRequests().subscribe((res) => {
      this.requestList.set(res);
    });
  }

  deniedRequest() {
    this.requestService.rejectRequest(this.selectedRequest?.id!).subscribe({
        next: () => {
           this.dataModal.set({title: 'Success', message: 'La peticion ha sido rechazada'});
          this.verifiyModal = true;
        },
        error: (err) => {
            this.dataModal.set({title: 'Error', message: err.error.message});
            this.verifiyModal = true;
        }
    });
  }

  verifyRequest() {
    this.requestService.VerifyRequest(this.selectedRequest?.id!).subscribe({
        next: () => {
            this.dataModal.set({title: 'Success', message: 'La peticion ha sido verificada'});
          this.verifiyModal = true;
        },
        error: (err) => {
            this.dataModal.set({title: 'Error', message: err.error.message});
            this.verifiyModal = true;
        }
    });
  }

  triggerViewRequest(request: RequestFullDTO) {
    this.selectedRequest = request;
    this.confirmDialog = true;
    this.dataConfirmDialog.set({title: request.title, message: 'Are you sure you want to view this request?'})
  }
}
