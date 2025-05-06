import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  authService = inject(AuthService)
  router = inject(Router)

  logOut() {
    this.authService.isAuth = false
    this.router.navigate(['/home'])
  }
}
