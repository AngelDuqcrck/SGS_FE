import {Component, signal} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {RequestDTO} from "./interfaces";
import {TableModule} from "primeng/table";
import {RequestService} from "./services/request.service";
import {Router} from "@angular/router";
import {DialogModule} from "primeng/dialog";

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [CommonModule, DatePipe, TableModule, DialogModule],
  templateUrl: './requests.component.html',
  styles: []
})
export class RequestsComponent {

  request = signal<RequestDTO[]>([])
  openDeleteDialog = false
  openSendDialog = false

  constructor(
    private requestService: RequestService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.requestService.getRequests().subscribe({
      next: (requests: RequestDTO[]) => {
        this.request.set(requests)
      }
    })
  }

  showRequestInfo(request: RequestDTO) {
    this.requestService.requestSelected = request;
    this.router.navigateByUrl('/backlog/requests/request-info')

  }

  deleteRequest() {
    this.requestService.deleteRequest().subscribe({
      next: () => {
        this.request.update(request => request.filter(r => r.id !== this.requestService.requestSelectedValue?.id!))
        this.openDeleteDialog = false;
        this.requestService.requestSelected = null
      },
      error: error => {
        this.requestService.requestSelected = null
      }
    })

  }

  sendRequest() {
    this.requestService.sendRequest().subscribe({
      next: () => {
        this.openSendDialog = false;
        this.requestService.requestSelected = null
      },
      error: error => {
        this.requestService.requestSelected = null
      }
    })
  }

  openDeleteDialogBox(request: RequestDTO) {
    this.openDeleteDialog = true;
    this.requestService.requestSelected = request;
  }

  openSendDialogBox(request: RequestDTO) {
    this.openSendDialog = true;
    this.requestService.requestSelected = request;
  }

  onCloseDialog() {
    this.requestService.requestSelected = null;
  }


}
