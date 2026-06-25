import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { jwtDecode } from 'jwt-decode';
import {
  SignupCandidatoDto,
  SignupCandidatoResponse,
  LoginCandidatoDto,
  LoginResponse,
  JwtPayload,
} from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  loginCandidato(data: LoginCandidatoDto) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/aspirant/login`, data);
  }

  signupCandidato(data: SignupCandidatoDto) {
    return this.http.post<SignupCandidatoResponse>(`${this.apiUrl}/auth/aspirant/signup`, data);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
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
