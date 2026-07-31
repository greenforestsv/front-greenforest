import { HttpClient, HttpParams } from '@angular/common/http';
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
import { delay } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

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
  changePassword(current_password: string, new_password: string) {
    return of({
      success: true,
      message: 'Contraseña actualizada correctamente',
    }).pipe(delay(1000));
  }

  /* LOGOUT */
  logout(): void {
    localStorage.removeItem('token');
  }

  /* RESET PASSWORD */
  resetPassword(): void {
    /* TODO:  */
    return;
  }

  /* IS AUTHENTICATED */
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
