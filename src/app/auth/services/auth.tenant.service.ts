import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import {
  LoginEmployeeDto,
  LoginEmployeeResponseDto,
  SignupTenantDto,
  TenantJwtPayload,
  UpdateCredentials,
} from '../interfaces/auth.tenant.interface';
import { SignupTenantResponseDto } from '../interfaces/auth.tenant.interface';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthTenantService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  /* LOGIN */
  loginEmployee(data: LoginEmployeeDto) {
    return this.http.post<LoginEmployeeResponseDto>(`${this.apiUrl}/tenant/auth/employee`, data);
  }

  /* SIGNUP */
  signupTenant(data: SignupTenantDto) {
    return this.http.post<SignupTenantResponseDto>(`${this.apiUrl}/registration/tenant`, data);
  }

  /* UPDATE CREDENTIALS */
  updateCredentials(body: UpdateCredentials) {
    return this.http.patch(`${this.apiUrl}/tenant/update-login`, body);
  }

  /* IS AUTHENTICATED */
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');

    if (!token) {
      return false;
    }

    try {
      const decoded = jwtDecode<TenantJwtPayload>(token);

      if (!decoded.exp || decoded.exp * 1000 <= Date.now()) {
        return false;
      }

      return (
        !!decoded.tenant_id && !!decoded.role && !!decoded.tenant_name && !!decoded.normalized_name
      );
    } catch {
      return false;
    }
  }

  /* TOKEN DECODE */
  getTokenPayload(): TenantJwtPayload | null {
    const token = localStorage.getItem('token');

    if (!token) {
      return null;
    }

    try {
      return jwtDecode<TenantJwtPayload>(token);
    } catch {
      return null;
    }
  }
}
