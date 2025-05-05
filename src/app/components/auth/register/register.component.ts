import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { User, UserFormData } from '../../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  authService = inject(AuthService)
  router = inject(Router)
  registerError: string | null = null

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
      if (pass1 === pass2) return null
      return {message: 'password are not equal'}
    }
  }

  async onSubmit() {

    try {
      await this.authService.RegisterUser(this.formData) as User
      this.authService.isAuth = true
      this.router.navigate(['/home'])
    } catch (error) {
      this.registerError = error instanceof Error ? error.message : 'An unknown error occurred.'
    }
  }

  get formData(): UserFormData {
    const email = this.registerForm.controls.email.value!
    const psw = this.registerForm.controls.password1.value!
    return {email, psw}
  }
}
