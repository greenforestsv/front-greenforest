import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import {
  GetVacanteDto,
  CreateVacanteDto,
  FilterJobListDto,
} from '../interfaces/vacantes.interfaces';
import { PaginatedRequest, PaginatedResponse } from '../interfaces/pagination.interface';

@Injectable({
  providedIn: 'root',
})
export class VacantesService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  /* OBTENER VACANTES */
  getJobs({ limit, offset, filters = {} }: PaginatedRequest<FilterJobListDto>) {
    let params = new HttpParams().set('limit', limit).set('offset', offset);
    const { name, department, format, min_salary, max_salary } = filters;

    if (name) {
      params = params.set('name', name);
    }
    if (department) {
      params = params.set('department', department);
    }
    if (format) {
      params = params.set('format', format);
    }
    if (min_salary) {
      params = params.set('min_salary', min_salary);
    }
    if (max_salary) {
      params = params.set('max_salary', max_salary);
    }

    return this.http.get<PaginatedResponse<GetVacanteDto>>(`${this.apiUrl}/jobs/public`, {
      params,
    });
  }

  /* CREAR VACANTE */
  createJob(vacante: CreateVacanteDto) {
    return this.http.post<CreateVacanteDto>(`${this.apiUrl}/posting-job`, vacante);
  }
}
