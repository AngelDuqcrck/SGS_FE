import {Component, signal} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {RequestDTO, RequestFullDTO} from "./interfaces";
import {TableModule} from "primeng/table";
import {RequestService} from "./services/request.service";
import {Router} from "@angular/router";
import {DialogModule} from "primeng/dialog";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [CommonModule, DatePipe, TableModule, DialogModule, ReactiveFormsModule, InputTextModule, InputTextModule],
  templateUrl: './requests.component.html',
  styles: []
})
export class RequestsComponent {

  request = signal<RequestDTO[]>([])
  openDeleteDialog = false
  openSendDialog = false
  openAddDialogForm = false
  requestForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(3)]],
  })

  constructor(
    private requestService: RequestService,
    private router: Router,
    private fb: FormBuilder
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

  openAddDialogBox() {
    this.openAddDialogForm = true;
  }

  onCloseDialog() {
    this.requestService.requestSelected = null;
  }

  submit() {
    if(this.requestForm.invalid) return;

    this.requestService.createRequest(this.requestForm.value).subscribe({
      next: (res: RequestFullDTO) => {
        this.request.update(request => [...request, this.mappedToRequestDTO(res)])
        this.openAddDialogForm = false;
        this.requestService.requestSelected = null
      },
      error: error => {
        console.log(error)
        this.requestService.requestSelected = null
      }
    })

  }

  private mappedToRequestDTO(request: RequestFullDTO): RequestDTO {
    return {
      id: request.id,
      title: request.title,
      requestDate: request.requestDate
    }
  }
}
