import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { SignupTenantDto } from '../interfaces/auth.tenant.interface';
import { SignupTenantResponseDto, JwtPayload } from '../interfaces/auth.tenant.interface';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthTenantService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /* SIGNUP */
  signupTenant(data: SignupTenantDto) {
    return this.http.post<SignupTenantResponseDto>(`${this.apiUrl}/registration-tenant`, data);
  }

  /* IS AUTHENTICATED */
  isAuthenticated(): boolean {
    /* TODO: debe ser rol correcto */
    const token = localStorage.getItem('token');

    if (!token) return false;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }
}
