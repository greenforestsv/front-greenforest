import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { AuthAspirantService } from '../../auth/services/auth.aspirant.service';
import { AuthTenantService } from '../../auth/services/auth.tenant.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [ButtonModule, RouterLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
})
export class NotFoundComponent {
  private readonly router = inject(Router);
  private readonly authAspirantService = inject(AuthAspirantService);
  private readonly authTenantService = inject(AuthTenantService);

  volverAlInicio(): void {
    if (this.authTenantService.isAuthenticated()) {
      this.router.navigate(['/empresa']);
      return;
    }

    if (this.authAspirantService.isAuthenticated()) {
      this.router.navigate(['/candidato']);
      return;
    }

    this.router.navigate(['/']);
  }
}
