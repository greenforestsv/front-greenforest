import { inject, Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { ApplicationResponseDto, Postulacion } from '../interfaces/postulacion.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PostulacionesService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  /* GET POSTULACIONES */
  getPostulaciones() {
    return this.http.get<Postulacion[]>(`${this.apiUrl}/applications/aspirant`);
  }

  /* CREAR POSTULACIÓN */
  applyToJob(id_vacante: string, id_empresa: string) {
    return this.http.post<ApplicationResponseDto>(
      `${this.apiUrl}/applications/apply/${id_vacante}/${id_empresa}`,
      null,
    );
  }
}
