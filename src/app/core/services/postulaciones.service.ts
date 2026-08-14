import { inject, Injectable } from '@angular/core';
import {
  ApplicationResponseDto,
  GetCandidatoDto,
  GetPostulacionCandidatoDto,
} from '../interfaces/postulacion.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PostulacionesService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  /* GET POSTULACIONES DE CANDIDATO */
  getPostulacionesCandidato() {
    return this.http.get<GetPostulacionCandidatoDto[]>(`${this.apiUrl}/central/applications`);
  }

  /* CREAR POSTULACIÓN */
  applyToJob(id_vacante: string) {
    return this.http.post<ApplicationResponseDto>(`${this.apiUrl}/apply-job/${id_vacante}`, null);
  }

  /* GET CANDIDATOS POSTULACIÓN */
  getCandidatosPostulacion(job_id: string) {
    return this.http.get<GetCandidatoDto[]>(`${this.apiUrl}/applications/tenant/${job_id}`);
  }
}
