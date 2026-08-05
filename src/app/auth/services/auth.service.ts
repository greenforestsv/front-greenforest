import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { jwtDecode } from 'jwt-decode';
import {
  SignupCandidatoDto,
  SignupCandidatoResponse,
  LoginCandidatoDto,
  LoginResponse,
  JwtPayload,
} from '../interfaces/auth.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = environment.apiUrl;

  /* LOGIN */
  loginCandidato(data: LoginCandidatoDto) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login/aspirant`, data);
  }

  /* SIGNUP */
  signupCandidato(data: SignupCandidatoDto) {
    return this.http.post<SignupCandidatoResponse>(`${this.apiUrl}/register-aspirant`, data);
  }

  /* VERIFY */
  verifyCandidato(id: string, code: string) {
    const params = new HttpParams().set('code', code);

    return this.http.get(`${this.apiUrl}/verify/aspirant-code/${id}`, { params });
  }

  /* CHANGE PASSWORD */
  changePassword(old_password: string, new_password: string) {
    return this.http.patch(`${this.apiUrl}/auth/aspirant/password`, { old_password, new_password });
  }

  /* LOGOUT */
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  /* RESET PASSWORD */
  resetPassword(): void {
    /* TODO:  */
    return;
  }

  /* IS AUTHENTICATED */
  isAuthenticated(): boolean {
    /* TODO: debe ser rol aspirante */
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
