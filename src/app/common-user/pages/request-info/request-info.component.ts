import {Component, signal} from '@angular/core';
import {CommonModule, DatePipe, JsonPipe} from '@angular/common';
import {RequestService} from "../../services/request.service";
import {RequestFullDTO, StatusHistoryRequest} from "../../interfaces";
import {HttpClient} from "@angular/common/http";
import {STATUS_REQUEST} from "../../const";
import { TimelineModule } from 'primeng/timeline';
@Component({
  selector: 'app-request-info',
  standalone: true,
  imports: [CommonModule, JsonPipe, DatePipe, TimelineModule],
  templateUrl: './request-info.component.html',
  styles: [
  ]
})
export class RequestInfoComponent {

  selectedRequest = signal<RequestFullDTO | null>(null);

  constructor(
    private  requestService: RequestService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.requestService.getlookRequestDetails().subscribe({
      next: (requests: RequestFullDTO) => { this.selectedRequest.set(requests)}
    })
  }

  get status(): string {
    return STATUS_REQUEST[this.selectedRequest()?.statusId!-1 || 0];
  }

  getStatusHistory(status: StatusHistoryRequest): string {
    return STATUS_REQUEST[status.statusId - 1 || 0];
  }
}
