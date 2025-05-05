import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  authService = inject(AuthService)

  registerForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email]
    }),
    password1: new FormControl('', {
      validators: [Validators.required]
    }),
    password2: new FormControl('', {
      validators: [Validators.required]
    })
  }, {
    validators: [this.matchPasswords()]
  })

  matchPasswords(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const pass1 = formGroup.get('password1')?.value
      const pass2 = formGroup.get('password2')?.value
      console.log(pass1, 'pass 1')
      console.log(pass2, 'pass 2')
      if (pass1 === pass2) return null

      return {message: 'password are not equal'}
    }
  }

  onSubmit() {
    const userEmail = this.registerForm.controls.email.value!
    this.authService.RegisterUser(userEmail)
    .then(data => console.log(data))
  }
}
