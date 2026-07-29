import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { SignupTenantDto } from '../interfaces/auth.tenant.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthTenantService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /* SIGNUP */
  signupTenant(data: SignupTenantDto) {
    return this.http.post(`${this.apiUrl}/registration-tenant`, data);
    //return this.http.post<SignupCandidatoResponse>(`${this.apiUrl}/registration-tenant`, data);
  }
}
