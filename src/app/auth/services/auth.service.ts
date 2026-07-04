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
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  // Endpoint público y seguro para obtener la IP en formato JSON
  private ipApiUrl = 'https://ipapi.co';

  constructor(private http: HttpClient) {}

  loginCandidato(data: LoginCandidatoDto) {
    return this.http.get<{ ip: string }>(this.ipApiUrl).pipe(
      // Extraemos solo el string de la IP
      map((res) => res.ip),

      // Si la API de IP falla, asignamos un valor por defecto para no romper el Login
      catchError(() => of('0.0.0.0')),

      // Encadenamos la respuesta con tu petición POST original
      switchMap((clientIp) => {
        console.log({ ip_login: clientIp });
        return this.http.post<LoginResponse>(`${this.apiUrl}/auth/aspirant`, {
          ...data,
          ip_login: clientIp, // IP real del cliente
        });
      }),
    );
  }

  signupCandidato(data: SignupCandidatoDto) {
    return this.http.post<SignupCandidatoResponse>(`${this.apiUrl}/aspirant`, data);
  }

  verifyCandidato(id: string, code: string) {
    const params = new HttpParams().set('code', code);

    return this.http.get(`${this.apiUrl}/verify/aspirant-code/${id}`, { params });
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  resetPassword(): void {
    /* TODO: */
    return;
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
