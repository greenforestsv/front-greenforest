import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { CV, CreateCV } from '../interfaces/cv.interfaces';
import {
  FilterAspirantListDto,
  PatchAspirantDto,
  PrivateAspirant,
  PublicAspirant,
} from '../interfaces/aspirant.interfaces';
import { PaginatedRequest, PaginatedResponse } from '../../core/interfaces/pagination.interface';

@Injectable({
  providedIn: 'root',
})
export class AspirantesService {
  /* CONSTRUCTOR */
  constructor(private http: HttpClient) {}
  private apiUrl = environment.apiUrl;

  /* GET ASPIRANTE ME */
  getAspirantMe() {
    return this.http.get<PrivateAspirant>(`${this.apiUrl}/aspirant/me`);
  }

  /* GET CURRICULUM */
  getCV() {
    return this.http.get<CV>(`${this.apiUrl}/aspirant/cv`);
  }

  /* PATCH CURRICULUM */
  patchCV(body: CreateCV) {
    return this.http.patch<CV>(`${this.apiUrl}/aspirant/cv`, body);
  }

  /* PATCH APIRANTE */
  patchApirant(data: PatchAspirantDto) {
    return this.http.patch(`${this.apiUrl}/aspirant`, data);
  }

  /* GET APIRANTES */
  getAspirants({ limit, offset, filters }: PaginatedRequest<FilterAspirantListDto>) {
    let params = new HttpParams().set('limit', limit).set('offset', offset);

    if (filters?.name) {
      params = params.set('name', filters?.name);
    }

    if (filters?.profession) {
      params = params.set('profession', filters?.profession);
    }

    if (filters?.skills?.length) {
      params = params.set('skills', JSON.stringify(filters.skills));
    }

    return this.http.get<PaginatedResponse<PublicAspirant>>(`${this.apiUrl}/aspirant/list`, {
      params,
    });
  }
}
