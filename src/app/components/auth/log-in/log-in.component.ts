import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-log-in',
  imports: [RouterLink],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {
  authService = inject(AuthService)
  route = inject(Router)

  fakeLogin() {
    this.authService.isAuth = true
    this.route.navigate([''])
  }
}
