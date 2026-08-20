import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthTenantService } from '../services/auth.tenant.service';

export const authTenantGuard: CanMatchFn = () => {
  const authTenantService = inject(AuthTenantService);
  const router = inject(Router);

  return authTenantService.isAuthenticated() ? true : router.createUrlTree(['/login-empresarial']);
};
