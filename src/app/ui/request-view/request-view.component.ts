import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RequestFullDTO} from "../../common-user/interfaces";
import {RequestStatusPipe} from "../../service-boss/pipes/request-status.pipe";

@Component({
  selector: 'app-request-view',
  standalone: true,
  imports: [CommonModule,RequestStatusPipe],
  templateUrl: './request-view.component.html',
  styles: [
  ]
})
export class RequestViewComponent {

  @Input({required: true}) request: RequestFullDTO | null | undefined;
  @Output() requestChange: EventEmitter<RequestFullDTO | null | undefined> = new EventEmitter();
}
