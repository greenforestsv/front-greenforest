import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthAspirantService } from '../services/auth.aspirant.service';

export const authAspirantGuard: CanMatchFn = () => {
  const authAspirantService = inject(AuthAspirantService);
  const router = inject(Router);

  return authAspirantService.isAuthenticated() ? true : router.createUrlTree(['/login-candidato']);
};
