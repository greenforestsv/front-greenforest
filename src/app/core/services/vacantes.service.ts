import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { GetVacanteDto, CreateVacanteDto } from '../interfaces/vacantes.interfaces';
import { PaginatedResponse } from '../interfaces/pagination.interface';

@Injectable({
  providedIn: 'root',
})
export class VacantesService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  /* OBTENER VACANTES */
  getJobs(limit: number, offset: number) {
    return this.http.get<PaginatedResponse<GetVacanteDto>>(
      `${this.apiUrl}/jobs?limit=${limit}&offset=${offset}`,
    );
  }

  /* CREAR VACANTE */
  createJob(vacante: CreateVacanteDto) {
    return this.http.post<CreateVacanteDto>(`${this.apiUrl}/posting-job`, vacante);
  }
}
