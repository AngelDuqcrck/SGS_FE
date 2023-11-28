import {Component, OnDestroy, OnInit, signal, WritableSignal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserDTO, UserService} from "../shared/user.service";
import {Subscription} from "rxjs";
import {TagModule} from "primeng/tag";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {CheckboxModule} from 'primeng/checkbox';
import {FileUploadModule} from 'primeng/fileupload';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {ToastModule} from 'primeng/toast';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {MessageService} from 'primeng/api';
import {HttpResponseDTO} from "../shared/map/HttpResponseDTO";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, TagModule, InputTextModule, DropdownModule, CheckboxModule, ButtonModule, FileUploadModule],
  templateUrl: './profile.component.html',
  styles: [],
  providers: [MessageService]
})
export class ProfileComponent implements OnInit, OnDestroy {

  user!: WritableSignal<UserDTO>;
  userSubscription$!: Subscription;
  userForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(5)]],
    lastName: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.email]],
    rol: [{value: '', disabled: true}]
  })

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private http: HttpClient,
    private messageService: MessageService
  ) {
    this.user = signal({} as UserDTO);

  }

  ngOnInit(): void {
    this.userSubscription$ = this.userService.currentUser.subscribe({
      next: res => {
        this.user.set({...res})
        this.userForm.patchValue({
          email: this.user().email,
          firstName: this.user()?.firstName,
          lastName: this.user().lastName,
          rol: this.user().rol,
        })
      }
    })

  }

  ngOnDestroy() {
    this.userSubscription$.unsubscribe()
    this.user.set({} as UserDTO);
  }

  onSubmit() {

    const userData = {
      ...this.userForm.value,
      username: this.userForm.get('username')?.value,
      role: this.userForm.get('role')?.value,
      profileImg: null
    }

    const formData = new FormData();
    formData.append('userData', new Blob([JSON.stringify(userData)], {type: 'application/json'}));

  }

}
