import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthAspirantService } from '../services/auth.aspirant.service';
import { AuthTenantService } from '../services/auth.tenant.service';

export const guestGuard: CanMatchFn = () => {
  const authAspirantService = inject(AuthAspirantService);
  const authTenantService = inject(AuthTenantService);
  const router = inject(Router);

  if (authTenantService.isAuthenticated()) {
    return router.createUrlTree(['/empresa']);
  }

  if (authAspirantService.isAuthenticated()) {
    return router.createUrlTree(['/candidato']);
  }

  return true;
};
