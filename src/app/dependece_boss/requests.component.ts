import {Component, signal} from '@angular/core';
import {CommonModule, DatePipe, JsonPipe} from '@angular/common';
import {RequestBossService} from "./services/request-boss.service";
import {TableModule} from "primeng/table";
import {RequestFullDTO} from "../common-user/interfaces";
import {DialogModule} from "primeng/dialog";
import {UserService} from "../shared/user.service";

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [CommonModule, TableModule, DialogModule, JsonPipe, DatePipe],
  templateUrl: './requests.component.html',
  styles: [
  ]
})
export class RequestsComponent {

  requestList = signal<RequestFullDTO[]>([]);
  selectedRequest = signal<RequestFullDTO | null | undefined>(null);
  openGoodResponse = false;
  openErrResponse = false;
  openViewDialog = false;

  constructor(
    private requestService: RequestBossService,
    private currentUser: UserService
  ) { }

  ngOnInit(): void {
    this.requestService.getRequests().subscribe({
      next: (res) => this.requestList.set(res)
    })
  }

  get dependenceName(): string {
    return this.currentUser.currentUserValue.dependence.name;
  }

  openViewDialogFunc(request: RequestFullDTO) {
    this.selectedRequest.set(request);
    this.openViewDialog = true;
  }

  approveRequest() {
    this.requestService.VerifyRequest(this.selectedRequest()?.id!).subscribe({
      next: (res: any) => {
        this.openGoodResponse = true;
        this.openViewDialog = false;
        this.selectedRequest.set(null);
      },
      error: (err: any) => {
        this.openErrResponse = true;
        this.openViewDialog = false;
        this.selectedRequest.set(null);
      }
    })
  }

  rejectRequest() {
    this.requestService.rejectRequest(this.selectedRequest()?.id!).subscribe({
      next: (res: any) => {
        this.openGoodResponse = true;
        this.openViewDialog = false;
        this.selectedRequest.set(null);
      },
      error: (err: any) => {
        this.openErrResponse = true;
        this.openViewDialog = false;
        this.selectedRequest.set(null);
      }
    })
  }

}
