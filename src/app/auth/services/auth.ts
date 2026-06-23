import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  /* TODO: interface */
  loginCandidato(data: { email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/auth/aspirant/login`, {
      email: data.email,
      password: data.password,
      ip_login: '127.0.0.1' /* TODO: */,
    });
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
