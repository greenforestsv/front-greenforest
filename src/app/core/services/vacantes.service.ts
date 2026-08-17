import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import {
  GetVacanteDto,
  CreateVacanteDto,
  FilterJobListDto,
  GetDetalleVacanteDto,
  GetProcesoDto,
  PatchVacanteDto,
} from '../interfaces/vacantes.interfaces';
import { PaginatedRequest, PaginatedResponse } from '../interfaces/pagination.interface';

@Injectable({
  providedIn: 'root',
})
export class VacantesService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  /* OBTENER TODAS LAS VACANTES */
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

    return this.http.get<PaginatedResponse<GetVacanteDto>>(`${this.apiUrl}/central/jobs/actives`, {
      params,
    });
  }

  /* OBTENER VACANTES DE UNA EMPRESA */
  getTenantJobs({ limit, offset, filters = {} }: PaginatedRequest<FilterJobListDto>) {
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

    return this.http.get<PaginatedResponse<GetVacanteDto>>(`${this.apiUrl}/tenant/jobs`, {
      params,
    });
  }

  /* CREAR VACANTE */
  createJob(vacante: CreateVacanteDto) {
    return this.http.post<CreateVacanteDto>(`${this.apiUrl}/posting-job`, vacante);
  }

  /* VER DETALLE VACANTE */
  getJobDetails(id: string) {
    return this.http.get<GetDetalleVacanteDto>(`${this.apiUrl}/job-details/${id}`);
  }

  /* GET PROCESSES DE VACANTES */
  getActiveJobProcesses() {
    return this.http.get<GetProcesoDto[]>(`${this.apiUrl}/process-application/active/list`);
  }

  /* PATCH VACANTE */
  patchJob(job_id: string, body: PatchVacanteDto) {
    return this.http.patch(`${this.apiUrl}/job/${job_id}`, body);
  }
}
