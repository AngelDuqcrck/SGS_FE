import {Component, signal} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {RequestDTO} from "./interfaces";
import {TableModule} from "primeng/table";
import {RequestService} from "./services/request.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [CommonModule, DatePipe,TableModule ],
  templateUrl: './requests.component.html',
  styles: [
  ]
})
export class RequestsComponent {

  request  = signal<RequestDTO[]>([])

  constructor(
    private requestService: RequestService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.requestService.getRequests().subscribe({
      next: (requests: RequestDTO[]) => { this.request.set(requests)}
    })
  }


  showRequestInfo(request: RequestDTO) {
    this.requestService.requestSelected = request;
    this.router.navigateByUrl('/backlog/requests/request-info')

  }



}
