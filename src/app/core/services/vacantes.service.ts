import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Vacante, VacantesResponse } from '../interfaces/vacantes.interfaces';

@Injectable({
  providedIn: 'root',
})
export class VacantesService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  /* OBTENER VACANTES */
  getJobs(limit: number, offset: number) {
    return this.http.get<VacantesResponse>(`${this.apiUrl}/jobs?limit=${limit}&offset=${offset}`);
  }

  /* CREAR VACANTE */
  createJob(vacante: Vacante) {
    return this.http.post<Vacante>(`${this.apiUrl}/posting-job`, vacante);
  }
}
