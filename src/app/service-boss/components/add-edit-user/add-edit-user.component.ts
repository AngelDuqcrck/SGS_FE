import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserFullDTO} from "../../interfaces";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {DialogModule} from "primeng/dialog";
import {ButtonModule} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {dependences, roles} from './const/dependencies'
@Component({
  selector: 'app-add-edit-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DialogModule, ButtonModule, DropdownModule],
  templateUrl: './add-edit-user.component.html',
  styles: [
  ]
})
export class AddEditUserComponent {

  @Input() user: UserFullDTO | undefined
  visible = true;

  userForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(4)] ],
    lastName: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    rol: ['', [Validators.required]],
    dependence: ['', [Validators.required]]
  })

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    if (this.user) {
      this.userForm.patchValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        rol: this.user.rol,
        dependence: this.user.dependence.name
      })
    }

  }

  protected readonly dependences = dependences;
  protected readonly roles = roles;
}
