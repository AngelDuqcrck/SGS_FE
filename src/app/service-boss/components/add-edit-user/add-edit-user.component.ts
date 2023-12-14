import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserFullDTO} from "../../interfaces";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {DialogModule} from "primeng/dialog";
import {ButtonModule} from "primeng/button";
import { PasswordModule } from 'primeng/password';
import {DropdownModule} from "primeng/dropdown";
import {dependences, roles} from './const/dependencies'
import { randomPassword } from '../../utils'
import { UsersService } from '../../service/users.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-edit-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DialogModule, ButtonModule, DropdownModule, PasswordModule ],
  templateUrl: './add-edit-user.component.html',
  styles: [
  ]
})
export class AddEditUserComponent {

  protected readonly dependences = dependences;
  protected readonly roles = roles;


  @Input() user: UserFullDTO | null = null;
  @Output() userChange: EventEmitter<UserFullDTO | null> = new EventEmitter();

  @Input({required: true}) visible = true;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter();

  userForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(4)] ],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    role: [-1, [Validators.required]],
    dependence: [-1, [Validators.required]]
  })
  

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ) { }


  ngOnChanges(){
    if (this.user) {
      this.userForm.patchValue({ 
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        role: this.roles.find(rol => rol.id === this.user?.rol.id)?.id,
        dependence: this.dependences.find(dep => dep.id === this.user?.dependence.id)?.id
      })      
    }else 
      this.userForm.reset()
  }

  generateRandomPassword() { 
    const password = randomPassword(9)
    this.userForm.patchValue({
      password
    })
  }

  submit() {
    if(!this.userForm.valid) return

    if(!this.user){
      this.usersService.registerUser(this.mappedUserFormFromUser()).subscribe({
        next: (res) => {
          //reload the page
          window.location.reload();
        }
      })
    }else{
      this.usersService.updateUser(this.mappedUserFormFromUser()).subscribe({
        next: (res) => {
          //reload the page
          window.location.reload();
        }
      })
    }
  }

  triggerError(controlName: string) {
    const control = this.userForm.get(controlName)
    return control?.invalid && control?.touched
  }

  onHide() {
    this.visibleChange.emit(false)
    this.userChange.emit(null)
  }

  selectDependence(event: any){
    const value = Number(event.target.value);
    
    if(value === 5){
      this.userForm.patchValue({
        role: 1
      })
      this.userForm.get('role')?.disable()
      return
    }else{
      this.userForm.patchValue({
        role: 2
      })
      this.userForm.get('role')?.enable()
    }
  }

  selectRol(event: any){
    const value = Number(event.target.value);
    
    if(value === 1 || value === 4){
      this.userForm.patchValue({
        dependence: 5
      })
      this.userForm.get('dependence')?.disable()
      return
    }else{
      this.userForm.patchValue({
        dependence: 1
      })
      this.userForm.get('dependence')?.enable()
    } 
  }

  private mappedUserFormFromUser(): UserFullDTO {
    const values = this.userForm.value    
    return {
      firstName: values.firstName || '',
      lastName: values.lastName || '',
      email: values.email || '',
      password: values.password || '',
      rol: this.roles.find(rol => {
        return rol.id === Number(values.role) ? {role: rol.rol, id: rol.id} : undefined
      }) || {} as any,
      dependence: this.dependences.find(dep => dep.id === Number(values.dependence)) || this.dependences[0],
      id: this.user?.id || -1
    }
  }

}
