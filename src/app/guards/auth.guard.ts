import { inject } from '@angular/core';
import { CanActivateFn, createUrlTreeFromSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  if (authService.isAuth) return true

  console.log('you shall not pass')
  return router.createUrlTree(['login'])
  // return createUrlTreeFromSnapshot(route, ['login'])
};
