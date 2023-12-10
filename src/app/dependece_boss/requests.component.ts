import {Component, signal} from '@angular/core';
import {CommonModule, JsonPipe} from '@angular/common';
import {RequestBossService} from "./services/request-boss.service";
import {TableModule} from "primeng/table";
import {RequestFullDTO} from "../common-user/interfaces";
import {DialogModule} from "primeng/dialog";

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [CommonModule, TableModule, DialogModule, JsonPipe],
  templateUrl: './requests.component.html',
  styles: [
  ]
})
export class RequestsComponent {

  requestList = signal<RequestFullDTO[]>([]);
  selectedRequest = signal<RequestFullDTO | null | undefined>(null);
  openAcceptDialog = false;
  openRejectDialog = false;
  openViewDialog = false;

  constructor(
    private requestService: RequestBossService
  ) { }

  ngOnInit(): void {
    this.requestService.getRequests().subscribe({
      next: (res) => this.requestList.set(res)
    })
  }

  openViewDialogFunc(request: RequestFullDTO) {
    this.selectedRequest.set(request);
    this.openViewDialog = true;
  }

  openDialog(option: number) {
    option === 1 ? this.openAcceptDialog = true : this.openRejectDialog = true;
  }


}
