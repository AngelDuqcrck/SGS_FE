import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { RequestFullDTO } from 'src/app/common-user/interfaces';
import { RequestBossService } from 'src/app/dependece_boss/services/request-boss.service';

@Component({
  selector: 'app-request-boss-service',
  standalone: true,
  imports: [CommonModule, TableModule, DialogModule],
  templateUrl: './request.component.html',
  styles: [],
})
export class RequestComponent {
  requestList = signal<RequestFullDTO[]>([]);
  verifiyModal = false;
  dataModal  = signal({title: '', message: ''})

  constructor(private requestService: RequestBossService) {}

  ngOnInit(): void {
    this.requestService.getRequests().subscribe((res) => {
      this.requestList.set(res);
    });
  }

  deniedRequest(idRequest: number) {
    this.requestService.rejectRequest(idRequest).subscribe({
        next: () => {
            window.location.reload();
        },
        error: (err) => {
            this.dataModal.set({title: 'Error', message: err.error.message});
            this.verifiyModal = true;
        }
    });
  }

  verifyRequest(idRequest: number) {
    this.requestService.VerifyRequest(idRequest).subscribe({
        next: () => {
            window.location.reload();
        },
        error: (err) => {
            this.dataModal.set({title: 'Error', message: err.error.message});
            this.verifiyModal = true;
        }
    });
  }
}
