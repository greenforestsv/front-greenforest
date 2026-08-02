import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthTenantService } from '../services/auth.tenant.service';

/* TODO: que revise rol y plan */
export const authTenantGuard: CanMatchFn = () => {
  const authTenantService = inject(AuthTenantService);
  const router = inject(Router);

  return authTenantService.isAuthenticated() ? true : router.createUrlTree(['/login-empresa']);
};
