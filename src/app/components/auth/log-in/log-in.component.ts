import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { UserFormData } from '../../../models/user';

@Component({
  selector: 'app-log-in',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {
  authService = inject(AuthService)
  route = inject(Router)
  loading = true

  errorMessage: string | null = null

  loginForm = new FormGroup({
    email: new FormControl('anotheruser@mgail.com', {
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('zxcs', {
      validators: [Validators.required]
    })
  })

  get formData(): UserFormData {
    const email = this.loginForm.controls.email.value!
    const psw = this.loginForm.controls.password.value!
    return {email, psw}
  }

  async onSubmit() {
    this.loading = true
    try {
      await this.authService.LogInUser(this.formData)
      this.route.navigate(['/home'])
    } catch (err) {
      this.errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
    } finally {
      this.loading = false
    }
  }
}
