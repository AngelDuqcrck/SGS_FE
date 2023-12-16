import { Pipe, PipeTransform } from '@angular/core';
import {REQUEST_STATUS} from "../../dependece_boss/consts";

@Pipe({
  name: 'requestStatus',
  standalone: true
})
export class RequestStatusPipe implements PipeTransform {

  transform(value: number): unknown {
    return REQUEST_STATUS[value-1]
  }

}
