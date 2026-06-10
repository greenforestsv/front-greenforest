import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'auth-layout',
  imports: [RouterOutlet],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-surface-50">
      <div class="w-full max-w-md">
        <router-outlet />
      </div>
    </div>
  `,
})
export class AuthLayout {}
